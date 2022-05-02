const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide product name'],
        trim: true,
        maxlength: [120, 'Product name should not be more than 120 char']
    },
    price: {
        type: Number,
        required: [true, 'please provide product price'],
        maxlength: [6, 'Product price should not be more than 6 digit']
    },
    description: {
        type: String,
        required: true
    },
    photo: {
        id: {
            type: String,

        },
        secure_url: {
            type: String,

        }

    },
    ratings: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Product', productSchema)