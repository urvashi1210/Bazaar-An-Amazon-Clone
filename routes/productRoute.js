const express = require('express');
const productController  = require('../controller/productCtrl');
const {isAdmin, authMiddleware} = require('../middlewares/authMiddleware');
const uploadImage = require('../middlewares/uploadImage');
const router= express.Router();

router.post('/',authMiddleware,isAdmin,productController.createProduct);
router.get('/',productController.getAllProducts);
router.put('/upload/:id',authMiddleware,isAdmin ,uploadImage.uploadPhoto.array('images',10),uploadImage.productImgResize,productController.uploadImages);
router.put('/wishlist',authMiddleware,productController.addToWishlist);
router.put('/rating',authMiddleware,productController.rating);

router.get('/:id',productController.getaProduct);
router.put('/:id',authMiddleware,isAdmin,productController.updateProduct);
router.delete('/:id',authMiddleware,isAdmin,productController.deleteProduct);


module.exports = router;