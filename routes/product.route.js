const express = require('express')
const router = express.Router()
const upload = require('../multer')
const { isLoggedIn, customRole } = require('../middlewares/user')
const { 
    testProduct,
     addProduct, 
     getAllProduct, 
     adminGetallProduct, 
     getOneProduct, 
     adminUpdateOneProduct, 
     adminDeleteOneProduct,
        addReview,
        deleteReview, 
        getOnlyReviewsForOneProduct ,
        getProduct,
        adminGetOneProduct,
        adminupdateProductPage
    } = require('../controllers/product.controller')

// testing purpose only
router.route('/productdummy').get(testProduct)






// user route
// seen all product
router.route('/products').get(isLoggedIn,getAllProduct);

// seen only one product
router.route('/product/:id').get(getOneProduct);








// admin routes

//create product 
router.route('/admin/product/add')
.get(isLoggedIn, customRole('admin'), getProduct);
router.post('/admin/product/add',upload.single('photo'),isLoggedIn, customRole('admin'), addProduct)

// watch all product
router.route('/admin/products')
.get(isLoggedIn, customRole('admin'), adminGetallProduct);




// update product from
router.route('/admin/product').get(isLoggedIn, customRole('admin'), adminupdateProductPage)

// get one product
router.route('/admin/product/:id').get( adminGetOneProduct)

// delete one products
router.route('/admin/product/:id')
.delete(isLoggedIn, customRole('admin'), adminDeleteOneProduct)








// update product
router.put('/admin/product/:id',upload.array("files"),isLoggedIn, customRole('admin'), adminUpdateOneProduct)


























































































































// not implement
router.route('/review').put(isLoggedIn, addReview);
router.route('/review').delete(isLoggedIn, deleteReview);
router.route('/reviews').get(getOnlyReviewsForOneProduct);
// end


















module.exports = router