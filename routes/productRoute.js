const express=require("express");
const router=express.Router();

const {createProduct,getaProduct, getAllProducts, updateProduct, deleteProduct}=require("../controller/productCtrl");

const {isAdmin,authMiddleware}=require("../middlewares/authMiddleware");

router.post("/",authMiddleware,isAdmin,createProduct);
router.get("/:id",getaProduct);
router.get("/",getAllProducts);
router.put("/:id",authMiddleware,isAdmin,updateProduct);
router.delete("/:id",authMiddleware,isAdmin,deleteProduct)
module.exports=router;