const express = require('express');
const app = express()
const morgan = require('morgan');
const ejs = require('ejs')
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

//  middleware for handling req
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie and file middleware
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/"
}));

app.use(express.static('public'))


// ejs
app.set('view engine', 'ejs')


// morgan middleware
app.use(morgan("tiny"));



// importing routes
const homeRoute = require('./routes/home.route')

const userRoute = require('./routes/user.route')

// productRoute 
const productRoute = require('./routes/product.route');

// paymentRoute
const payment = require('./routes/payment.route');
// order route
const order = require('./routes/order.route')


// router middleware
app.use('/', homeRoute)

app.use('/api/v1', userRoute)

app.use('/api/v1', productRoute)


app.use('/api/v1', payment)

app.use('/api/v1', order)




app.get('/login',(req,res)=>{
    res.render('login')
})

app.get('/signup',(req,res)=>{
    res.render('signup')
})

app.get('/forget',(req,res)=>{
    res.render('forget',{
        msg:null
    })
})

app.get('/update',(req,res)=>{
    res.render('updatepassword')
})


app.get('/food',(req,res)=>{
    
})

app.get('/cart',(req,res)=>{
    res.render('cart')
})








// export app
module.exports = app