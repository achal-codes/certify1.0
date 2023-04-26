const mongoose = require("mongoose");

const {ObjectId} = mongoose.Schema;


// Check by replacing the count and total price in the product
//consists of all products in the cart
const productCartSchema = new mongoose.Schema({
    product: {
        type : ObjectId,
        ref : "Product"
    },

    name : {
        type : String
    },
    count: Number,
    price : Number
});
//modelling the product cart
const ProductCart = mongoose.model("ProductCart", productCartSchema);


//consists of all elements in the order page
const orderSchema = new mongoose.Schema({
    products: [productCartSchema],
    transaction_id : {},
    amount : {
        type:Number
    },
    address : String,
    status : {
        type : String,
        default : "Recieved",
        enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Recieved"],
    },
    //
    updated: Date,
    user : {
        type: ObjectId,
        ref : "User"
    }
},
{timestamps : true});

const Order = mongoose.model("Order", orderSchema);

module.exports = {Order,ProductCart};