const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const productController = require('../controllers/products');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,'./uploads/');
    },
    filename: function(req, file, cb) {
        cb(null,Date.now() +'-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    console.log(file)
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);        
    }else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        filesize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

// const db = require('../models');


//************************************************ 
router.get('/', productController.products_get_all);

router.post('/', checkAuth, upload.single('productImage'), productController.products_create_product);

router.get('/:productId', productController.products_get_product);

router.patch('/:productId', checkAuth, productController.products_update_product);

router.delete('/:productId', checkAuth, productController.products_delete_product);
//************************************************* 



module.exports = router;