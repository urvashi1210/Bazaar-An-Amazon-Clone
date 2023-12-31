const User=require('../models/userModel');
const jwt=require("jsonwebtoken");
const asyncHandler=require("express-async-handler");

exports.authMiddleware=asyncHandler(async(req,res,next)=>{
    let token;
    if(req?.headers?.authorization?.startsWith("Bearer")){
        token=req.headers.authorization.split(" ")[1];
        try{
            if(token){
                const decoded=jwt.verify(token,process.env.JWT_SECRET);
                const user=await User.findById(decoded?.id);
                req.user=user;
                // The retrieved user object is assigned to req.user, making it available for subsequent middleware or route handlers.
                next();
            }
        }catch(error){
            throw new Error("Not auhtorized. Token expired, please login again");
        }
    }else{
        throw new Error("There is no token attached to header!")
    }
})

exports.isAdmin=asyncHandler(async(req,res,next)=>{
    const {email}=req.user;
    const adminUser=await User.findOne({email});
    if(adminUser.role!=="admin"){
        throw new Error("You are not an admin");
    }
    else{
        next();
    }
});


//authMiddleware->isAdmin : first look for user exists(he is a legit user, has jwt) -> then check if he is admin
