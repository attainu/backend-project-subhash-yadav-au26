const bigPromise = require("../middlewares/bigPromise");
const fileUpload = require('express-fileupload')
const User = require('../models/user');
const Product = require('../models/product');
const WhereClause = require("../utils/whereClause");
const cloudinary = require('cloudinary').v2
const axios = require('axios')
exports.testProduct = bigPromise(async(req, res) => {
    res.status(200).json({
        success: true,
        status: "success"
    })
})

exports.getProduct = (req,res)=>{
    let msg =''
    res.render('addproduct',{
        msg
    })
}



exports.addProduct = bigPromise(async(req, res, next) => {
    let msg = 'product is added'
    if (!req.files) {
        return res.status(400).send('photo is required')
           
    }

    let result;
    if (req.files) {
        let file = req.files.photo
        result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "FOOD-SANTA",
            width: 150,
            crop: "scale"
        })
    }
    const {name , price ,description} = req.body
    const product = await Product.create({
        name,
        price,
        description,
        photo: {
            id: result.public_id,
            secure_url: result.secure_url
        }
    });


    res.render('addproduct',{
        msg
    })
 
})


exports.getAllProduct = bigPromise(async(req, res, next) => {
    const resultperPage = 6;
    const totalCountProduct = await Product.countDocuments();


    const productsObj = new WhereClause(Product.find(), req.query).search().filter();

    let products = await productsObj.base

    const filterProductNumber = products.length

    productsObj.pager(resultperPage)
    products = await productsObj.base.clone()


    user={
        name:req.user.name,
        photo:req.user.photo.secure_url
    }
    console.log(user)
    res.render('food',{
        products,
        user
    })
})

exports.getOneProduct = bigPromise(async(req, res, next) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        return res.status(401).send('No product found with this id')
    }
    res.status(200).json({
        success: true,
        product
    })
})




// admin
exports.adminGetallProduct = bigPromise(async(req, res, next) => {
    const products = await Product.find()
    console.log(products.length)
    if (!products) {
        res.status(400).send('No product found')
    }
   
    res.render('adminseenProduct',{
        products
    })
})

exports.adminupdateProductPage = async(req,res)=>{
    try {

        const id = req.query.id
        console.log(id)
        await axios.get(`http://localhost:4000/api/v1/admin/product/${id}`)
        .then((response)=>{
            let product = response.data
            res.render('updateproduct',{
                product
            })
            
        })
        .catch((err)=>{
            console.log(err)
        })

    } catch (error) {
        res.send(error)
    }

}

exports.adminGetOneProduct= bigPromise(async(req, res, next) => {

    let product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(401).send('Product not found')
    }
    res.send(product)
   

})


exports.adminUpdateOneProduct = bigPromise(async(req, res, next) => {
    let msg = 'product updated'
    let product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(401).send('Product not found')
    }

    if (req.files) {
        const imageId = product.photo.id
        const respo = await cloudinary.uploader.destroy(imageId);
        const result = await cloudinary.uploader.upload(req.files.photo.tempFilePath, {
            folder: "FOOD-SANTA",
            width: 150,
            crop: "scale"
        })
        product.photo = {
            id: result.public_id,
            secure_url: result.secure_url
        }
    }


    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })


    res.render('adminOneProduct',{
        product,
        msg
    })

})



exports.adminDeleteOneProduct = bigPromise(async(req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(401).send('Product not found')
    }
   
    const imageId = product.photo.id
    await cloudinary.uploader.destroy(imageId);
    await product.remove()
    res.status(200).json({
        success: true,
        message: 'Product deleted'
    })
})






// not implement
exports.addReview = bigPromise(async(req, res, next) => {
    const { rating, comment, productId } = req.body
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }
    const product = await Product.findById(productId)

    const alreadyReview = await product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    )
    if (alreadyReview) {
        product.reviews.forEach((review) => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment,
                    review.rating = rating
            }
        });
    } else {
        product.reviews.push(review)
        product.numberOfReviews = product.rev.length
    }

    // adjust rating
    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    // save
    await product.save({
        validateBeforeSave: false
    })

    res.status(200).json({
        success: true
    })

})

exports.deleteReview = bigPromise(async(req, res, next) => {
    const { productId } = req.query;

    const product = await Product.findById(productId);

    const reviews = product.reviews.filter(
        (rev) => rev.user.toString() === req.user._id.toString()
    )

    const numberOfReviews = reviews.length


    // adjust rating
    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length


    // update review
    await Product.findByIdAndUpdate(productId, {
        reviews,
        ratings,
        numberOfReviews
    }, {
        new: true,
        runValidators: true
    });

})

exports.getOnlyReviewsForOneProduct = bigPromise(async(req, res, next) => {
    const product = Product.findById(req.query.id)
    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})
// here end