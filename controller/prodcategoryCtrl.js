const Category=require("../models/prodcategoryModel.js");
const asyncHandler=require("express-async-handler");
const validateMongoDbId=require("../utils/validateMongodbId.js")

exports.createCategory=asyncHandler(async(req,res)=>{
    try{
        const newCategory=await Category.create(req.body);
        res.json(newCategory);
    }catch(error){
        throw new Error(error);
    }
})


exports.updateCategory=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongoDbId(id);
    try{
        const updatedCategory=await Category.findByIdAndUpdate(id,req.body,{
            new:true,
        });
        res.json(updatedCategory);
    }catch(error){
        throw new Error(error);
    }
})


exports.deleteCategory=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongoDbId(id);
    try{
        const deletedCategory=await Category.findByIdAndDelete(id);
        res.json(deletedCategory);
    }catch(error){
        throw new Error(error);
    }
})


exports.getCategory=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongoDbId(id);
    try{
        const getCategory=await Category.findById(id);
        res.json(getCategory);
    }catch(error){
        throw new Error(error);
    }
})

exports.getAllCategory=asyncHandler(async(req,res)=>{
    try{
        const getAllCategory=await Category.find();
        res.json(getAllCategory);
    }catch(error){
        throw new Error(error);
    }
})

