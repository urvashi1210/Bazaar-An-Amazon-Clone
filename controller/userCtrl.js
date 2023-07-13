const { generateToken } = require('../config/jwtToken');
const User=require('../models/userModel');
const asyncHandler=require('express-async-handler');

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
    const {id}=req.params;
    try{
        const updatedUser=await User.findByIdAndUpdate(id,{
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