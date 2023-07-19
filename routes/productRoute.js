const express=require("express");
const router=express.Router();

const {createProduct,getaProduct, getAllProducts, updateProduct, deleteProduct, addToWishlist, rating}=require("../controller/productCtrl");

const {authMiddleware,isAdmin}=require("../middlewares/authMiddleware");

router.post("/",authMiddleware,isAdmin,createProduct);
router.get("/",getAllProducts);
router.get("/:id",getaProduct);
router.put("/wishlist",authMiddleware,isAdmin,addToWishlist);
router.put("/rating",authMiddleware,isAdmin,rating);
router.put("/:id",authMiddleware,isAdmin,updateProduct);
router.delete("/:id",authMiddleware,isAdmin,deleteProduct);

module.exports=router;