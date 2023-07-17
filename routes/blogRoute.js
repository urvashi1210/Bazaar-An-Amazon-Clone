const express=require("express");
const router=express.Router();

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const {createBlog, updateBlog, getBlog}=require("../controller/blogCtrl");

router.post("/", authMiddleware, isAdmin, createBlog);
router.put("/:id", authMiddleware, isAdmin, updateBlog);
router.get("/:id",getBlog);

module.exports=router;


