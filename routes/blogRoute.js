const express=require("express");
const router=express.Router();

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const {createBlog, updateBlog, getBlog,getAllBlogs, deleteBlog, likeBlog}=require("../controller/blogCtrl");

router.post("/", authMiddleware, isAdmin, createBlog);
router.get("/",getAllBlogs);
router.put("/likes",authMiddleware,likeBlog);
router.put("/:id", authMiddleware, isAdmin, updateBlog);
router.get("/:id",getBlog);
router.delete("/:id",authMiddleware,isAdmin,deleteBlog);

module.exports=router;


