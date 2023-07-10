const User=require('../models/userModel');

exports.createUser=async(req,res)=>{
    const email=req.body.email;
    const findUser=await User.findOne({email});
    if(!findUser){
        //Create a new User
        const newUser=await User.create(req.body);
        res.json(newUser);
    }else{
        res.json({
            msg:"User Already Exist",
            status:false,
        })
    }
};

// module.exports={createUser};