const express=require('express');
const router=express.Router();

const {createUser,loginUserCtrl, getAllUsers,getaUser, deleteaUser,updatedUser, blockUser,unblockUser, handleRefreshToken, logout,updatePassword, forgotPasswordToken,resetToken}=require("../controller/userCtrl");
const { authMiddleware,isAdmin } = require('../middlewares/authMiddleware');

router.post("/register",createUser);
router.post("/forgot-password-token",forgotPasswordToken);
router.put("/reset-password-token/:token",resetToken);
router.put('/password',authMiddleware,updatePassword);
router.post("/login",loginUserCtrl);
router.get("/all-users",getAllUsers);
router.get("/refresh",handleRefreshToken);
router.get("/logout",logout);
router.get("/:id",authMiddleware,isAdmin,getaUser);
router.delete("/:id",deleteaUser);
router.put("/block-user/:id",authMiddleware,isAdmin,blockUser);
router.put("/edit-user",authMiddleware,isAdmin,updatedUser);
router.put("/unblock-user/:id",authMiddleware,isAdmin,unblockUser);

module.exports=router;

