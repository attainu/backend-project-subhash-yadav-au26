const express = require('express')
const router = express.Router()
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
.post(isLoggedIn, customRole('admin'), addProduct)
.get(isLoggedIn, customRole('admin'), getProduct);

// watch all product
router.route('/admin/products')
.get(isLoggedIn, customRole('admin'), adminGetallProduct);

// update product
router.route('/admin/product/:id')
.put(isLoggedIn, customRole('admin'), adminUpdateOneProduct)

// update product from
router.route('/admin/product').get(isLoggedIn, customRole('admin'), adminupdateProductPage)

// get one product
router.route('/admin/product/:id').get( adminGetOneProduct)

// delete one products
router.route('/admin/product/:id')
.delete(isLoggedIn, customRole('admin'), adminDeleteOneProduct)








// not implement
router.route('/review').put(isLoggedIn, addReview);
router.route('/review').delete(isLoggedIn, deleteReview);
router.route('/reviews').get(getOnlyReviewsForOneProduct);
// end


















module.exports = router