const Color=require("../models/colorModel.js");
const asyncHandler=require("express-async-handler");
const validateMongooseId=require("../utils/validateMongooseId.js")

exports.createColor=asyncHandler(async(req,res)=>{
    try{
        const newColor=await Color.create(req.body);
        res.json(newColor);
    }catch(error){
        throw new Error(error);
    }
})


exports.updateColor=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongooseId(id);
    try{
        const updatedColor=await Color.findByIdAndUpdate(id,req.body,{
            new:true,
        });
        res.json(updatedColor);
    }catch(error){
        throw new Error(error);
    }
})


exports.deleteColor=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongooseId(id);
    try{
        const deletedColor=await Color.findByIdAndDelete(id);
        res.json(deletedColor);
    }catch(error){
        throw new Error(error);
    }
})


exports.getColor=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongooseId(id);
    try{
        const getColor=await Color.findById(id);
        res.json(getColor);
    }catch(error){
        throw new Error(error);
    }
})

exports.getAllColor=asyncHandler(async(req,res)=>{
    try{
        const getAllColor=await Color.find();
        res.json(getAllColor);
    }catch(error){
        throw new Error(error);
    }
})

