const Blog=require("../models/blogModel")
const User=require("../models/userModel");
const asyncHandler=require("express-async-handler");
const validateMongoDbId=require("../utils/validateMongodbId");
const expressAsyncHandler = require("express-async-handler");

exports.createBlog=asyncHandler(async(req,res)=>{
try{
    const newBlog=await Blog.create(req.body);
    res.json(newBlog)
}catch(error){
    throw new Error(error);
}
});

exports.updateBlog=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongoDbId(id);
    try{
        const updateBlog=await Blog.findByIdAndUpdate(id,req.body,{
            new:true,
        });
        res.json(updateBlog);
    }catch(error){
        throw new Error(error);
    }
})

exports.getBlog=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongoDbId(id);
    try{
        const getBlog=await Blog.findById(id);
        const updateViews=await Blog.findByIdAndUpdate(id,
            {
                $inc:{numViews:1},
            },{
                new:true
            }
            );
        res.json(updateViews);
    }catch(error){
        throw new Error(error);
    }
})

exports.getAllBlogs=asyncHandler(async(req,res)=>{
    try{
        const getBlogs=await Blog.find();
        res.json(getBlogs);
    }catch(error){
        throw new Error(error);
    }
})


exports.deleteBlog=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongoDbId(id);
    try{
        const deletedBlog=await Blog.findByIdAndDelete(id);
        res.json(deletedBlog);
    }catch(error){
        throw new Error(error);
    }
})

exports.likeBlog=asyncHandler(async(req,res)=>{
    const {blogId}=req.body;
    validateMongoDbId(blogId);
    
    //Find the blog you want to like
    const blog=await Blog.findById(blogId);
    //find the login user
    const loginUserId=req?.user?._id;
    //find if the user has liked the post
    const isLiked=blog?.isLiked;
    //find if the user has disliked the post
    const alreadyDisliked=blog?.dislikes?.find(
        (userId=userId?.toString()===loginUserId?.toString())
    );
    if(alreadyDisliked){
        const post=await Blog.findByIdAndUpdate(blogId,{
            $pull:{dislikes:loginUserId},isDisliked:false
        },
        {
            new:true
        });
        res.json(blog);
    }
    if(isLiked){
        const blog=await Blog.findByIdAndUpdate(blogId,
            {
                $pull:{likes:loginUserId},
                isLiked:false,
            },
            {
              new:true, 
            });
            res.json(blog);
    }
    else{
        const blog=await Blog.findByIdAndUpdate(blogId,
            {
                $push:{likes:loginUserId},
                isLiked:false
            },{
                new:true
            });
            res.json(blog);
    }
})