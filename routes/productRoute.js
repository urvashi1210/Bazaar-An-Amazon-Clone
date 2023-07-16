const express=require("express");
const router=express.Router();

const {createProduct,getaProduct, getAllProducts, updateProduct, deleteProduct}=require("../controller/productCtrl");

const {authMiddleware,isAdmin}=require("../middlewares/authMiddleware");

router.post("/",authMiddleware,isAdmin,createProduct);
router.get("/",getAllProducts);
router.get("/:id",getaProduct);
router.put("/:id",authMiddleware,isAdmin,updateProduct);
router.delete("/:id",authMiddleware,isAdmin,deleteProduct);

module.exports=router;