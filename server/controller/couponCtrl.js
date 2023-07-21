const Coupon=require("../models/couponModel.js");
const asyncHandler=require("express-async-handler");
const validateMongooseId=require("../utils/validateMongooseId.js");

exports.createCoupon=asyncHandler(async(req,res)=>{
    try{
        const newCoupon=await Coupon.create(req.body);
        res.json(newCoupon);
    }catch(error){
        throw new Error(error);
    }
})


exports.getAllCoupons=asyncHandler(async(req,res)=>{
    try{
        const coupons=await Coupon.find();
        res.json(coupons);
    }catch(error){
        throw new Error(error);
    }
})

exports.updateCoupon=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongooseId(id);
    
    try{
        const updatecoupon=await Coupon.findByIdAndUpdate(id,req.body,{
            new:true,
        });
        res.json(updatecoupon);
    }catch(error){
        throw new Error(error);
    }
})

exports.deleteCoupon=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongooseId(id);

    try{
        const deletecoupon=await Coupon.findByIdAndDelete(id);
        res.json(deletecoupon);
    }catch(error){
        throw new Error(error);
    }
})

