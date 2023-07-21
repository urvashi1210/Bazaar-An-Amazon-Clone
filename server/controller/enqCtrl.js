const Enquiry=require("../models/enqModel");
const asyncHandler=require("express-async-handler");
const validateMongooseId=require("../utils/validateMongooseId.js")

exports.createEnquiry=asyncHandler(async(req,res)=>{
    try{
        const newEnquiry=await Enquiry.create(req.body);
        res.json(newEnquiry);
    }catch(error){
        throw new Error(error);
    }
})


exports.updateEnquiry=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongooseId(id);
    try{
        const updatedEnquiry=await Enquiry.findByIdAndUpdate(id,req.body,{
            new:true,
        });
        res.json(updatedEnquiry);
    }catch(error){
        throw new Error(error);
    }
})


exports.deleteEnquiry=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongooseId(id);
    try{
        const deletedEnquiry=await Enquiry.findByIdAndDelete(id);
        res.json(deletedEnquiry);
    }catch(error){
        throw new Error(error);
    }
})


exports.getEnquiry=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongooseId(id);
    try{
        const getEnquiry=await Enquiry.findById(id);
        res.json(getEnquiry);
    }catch(error){
        throw new Error(error);
    }
})

exports.getAllEnquiry=asyncHandler(async(req,res)=>{
    try{
        const getAllEnquiry=await Enquiry.find();
        res.json(getAllEnquiry);
    }catch(error){
        throw new Error(error);
    }
})

