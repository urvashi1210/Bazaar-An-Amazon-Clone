const express=require('express');
const router=express.Router();

const {createUser,loginUserCtrl, getAllUsers,getaUser, deleteaUser,updatedUser, blockUser,unblockUser, handleRefreshToken, logout,updatePassword, forgotPasswordToken,resetToken, loginAdmin, getWishlist, saveAddress, userCart,getUserCart, emptyCart, applyCoupon, createOrder, getOrders, updateOrderStatus, getAllOrders, getOrderByUserId}=require("../controller/userCtrl");
const { authMiddleware,isAdmin } = require('../middlewares/authMiddleware');

router.post("/register",createUser);
router.post("/forgot-password-token",forgotPasswordToken);
router.put("/reset-password-token/:token",resetToken);
router.put('/password',authMiddleware,updatePassword);
router.put('/order/update-order/:id',authMiddleware,updateOrderStatus);
router.get("/all-users",getAllUsers);
router.get("/get-orders",authMiddleware,getOrders);
router.get("/getorder/:id",authMiddleware,getOrderByUserId);
router.get("/getallorders",authMiddleware,isAdmin,getAllOrders);
router.post("/login",loginUserCtrl);
router.post("/admin-login",loginAdmin);
router.post("/cart",authMiddleware,userCart);
router.post("/cart/applycoupon",authMiddleware,applyCoupon);
router.post("/cart/cash-order",authMiddleware,createOrder);
router.get("/refresh",handleRefreshToken);
router.get("/logout",logout);
router.get("/wishlist",authMiddleware,getWishlist);
router.get("/cart",authMiddleware,getUserCart);
router.get("/:id",authMiddleware,isAdmin,getaUser);
router.delete("/empty-cart",authMiddleware,emptyCart);
router.delete("/:id",deleteaUser);
router.put("/block-user/:id",authMiddleware,isAdmin,blockUser);
router.put("/edit-user",authMiddleware,isAdmin,updatedUser);
router.put("/save-address",authMiddleware,isAdmin,saveAddress);
router.put("/unblock-user/:id",authMiddleware,isAdmin,unblockUser);

module.exports=router;

