const express = require('express');
const {createProduct,getaProduct,getAllProducts,uploadImages,rating,updateProduct,deleteProduct, addToWishlist} = require('../controller/productCtrl');
const {isAdmin, authMiddleware} = require('../middlewares/authMiddleware');
const uploadImage = require('../middlewares/uploadImage');
const router= express.Router();

router.post('/',authMiddleware,isAdmin,createProduct);
router.get('/',getAllProducts);
router.put('/upload/:id',authMiddleware,isAdmin ,uploadImage.uploadPhoto.array('images',10),uploadImage.productImgResize,uploadImages);
router.put('/rating',authMiddleware,rating);
router.put('/wishlist',authMiddleware,addToWishlist);

router.get('/:id',getaProduct);
router.put('/:id',authMiddleware,isAdmin,updateProduct);
router.delete('/:id',authMiddleware,isAdmin,deleteProduct);


module.exports = router;