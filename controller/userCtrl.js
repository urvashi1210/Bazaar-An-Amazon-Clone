const { generateToken } = require('../config/jwtToken');
const User=require('../models/userModel');
const asyncHandler=require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongodbId');
const {generateRefreshToken}=require("../config/refreshToken");
const jwt=require("jsonwebtoken")


exports.createUser=asyncHandler(async(req,res)=>{
    const email=req.body.email;
    const findUser=await User.findOne({email});
    if(!findUser){
        const newUser=await User.create(req.body);
        res.json(newUser);
    }else{
       throw new Error("User already exists");
    }
});

exports.loginUserCtrl=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    const findUser=await User.findOne({email});
    if(findUser && (await findUser.isPasswordMatched(password))){
       const refreshToken=await generateRefreshToken(findUser?._id);
       const updateUser=await User.findByIdAndUpdate(findUser.id,{refreshToken:refreshToken},{new:true})
       
       res.cookie('refreshToken',refreshToken,{
        httpOnly:true,
        maxAge:72*60*60*1000,
       });
        res.json({
           _id: findUser?._id,
           firstname:findUser?.firstname,
           lastname:findUser?.lastname,
           email:findUser?.email,
           mobile:findUser?.mobile,
           token:generateToken(findUser?._id)
        });
    }else{
        throw new Error("Invalid Credentials");
    }
});

exports.getAllUsers=asyncHandler(async(req,res)=>{
    try{
        const getUsers=await User.find();
        res.json(getUsers);
    }catch(error){
        throw new Error(error);
    }
})

exports.getaUser=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongoDbId(id);
    try{
        const getaUser=await User.findById(id);
        res.json({
            getaUser,
        })
    }catch(error){
        throw new Error(error);
    }
})

exports.deleteaUser=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongoDbId(id);
    try{
        const deleteaUser=await User.findByIdAndDelete(id);
        res.json({
            deleteaUser,
        })
    }catch(error){
        throw new Error(error);
    }
})

exports.updatedUser=asyncHandler(async(req,res)=>{
    const {_id}=req.user;
    validateMongoDbId(_id);
    try{
        const updatedUser=await User.findByIdAndUpdate(_id,{
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            mobile:req.body.mobile
        },{
            new:true,
        });
        res.json(updatedUser);
    }catch(error){
        throw new Error(error);
    }
})

exports.blockUser=asyncHandler(async(req,res)=>{
const {id}=req.params;
validateMongoDbId(id);
try{
    const block=await User.findByIdAndUpdate(id,{
        isBlocked:true,
    },{
         new:true,
    }
);
res.json({
    message:"User Blocked",
})
}catch(error){
    throw new Error(error);
}
});

exports.unblockUser=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongoDbId(id);
    try{
        const unblock=await User.findByIdAndUpdate(id,{
            isBlocked:false,
        },{
             new:true,
        });
        res.json({
            message:"User unblocked",
        })
    }catch(error){
        throw new Error(error);
    }
});

exports.handleRefreshToken=asyncHandler(async(req,res,next)=>{
    console.log("start");    
    const cookie=req.cookies;
        console.log(cookie);
        if(!cookie?.refreshToken)throw new Error("No Refresh Token in cookies");
        const refreshToken=cookie.refreshToken;
        console.log(refreshToken);
        const user=await User.findOne({refreshToken});
        if(!user)throw new Error("No refresh token present in db or not matched")
        jwt.verify(refreshToken,process.env.JWT_SECRET,(err,decoded)=>{
            if(err||user.id!==decoded.id){
                throw new Error("There is something wrong with refresh token");
            }
            const accessToken=generateToken(user?._id);
            res.json({accessToken})
        })
    })


exports.logout=asyncHandler(async(req,res,next)=>{
    const cookie=req.cookies;
    if(!cookie?.refreshToken)throw new Error("No Refresh Token in Cookies");
    const refreshToken=cookie.refreshToken;
    const user=await User.findOne({refreshToken});
    if(!user){
        res.clearCookie('refreshToken',{    
            httpOnly:true,
            secure:true,
        });
        res.sendStatus(204);//forbidden
    }
    await User.findOneAndUpdate({refreshToken},{
        refreshToken:"",
    });
    res.clearCookie("refreshToken",{
        httpOnly:true,
        secure:true,
    })
    res.sendStatus(204);//forbidden

    //204 is designed to be used with res.sendStatus instead of res.status as 204 does not generate a response/message body
    //204 - no content
})    