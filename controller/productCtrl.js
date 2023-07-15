const Product=require("../models/productModel")
const asyncHandler=require("express-async-handler")

//SLUGIFY:
const slugify=require("slugify");
const { updatedUser } = require("./userCtrl");



exports.createProduct=asyncHandler(async(req,res)=>{
    try{
        if(req.body.title){
            req.body.slug=slugify(req.body.title);
        }
        const newProduct=await Product.create(req.body);
        res.json(newProduct);
    }catch(error){
        throw new Error(error);
    }
});

exports.getaProduct=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    try{
        const findProduct=await Product.findById(id);
        res.json(findProduct);
    }catch(error){
        throw new Error(error);
    }
});

exports.getAllProducts=asyncHandler(async(req,res)=>{
    try{
        const getAllProducts=await Product.find();
        res.json(getAllProducts);
    }catch(error){
        throw new Error(error);
    }
})

exports.updateProduct=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    // validateMongoDbId(id);
    try{
        if(req.body.title){
            req.body.slug=slugify(req.body.title);
        }
        const updatedProduct=await Product.findOneAndUpdate({_id:id},req.body,{
            new:true
        });
        res.json(updatedProduct);
    
    }catch(error){
        throw new Error(error);
    }
})

exports.deleteProduct=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    // validateMongoDbId(id);
    try{
        const deletedProduct=await Product.findOneAndDelete({_id:id});
        res.json(deletedProduct);
    }catch(error){
        throw new Error(error);
    }
})