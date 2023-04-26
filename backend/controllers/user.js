//Importing USer model from the models folder

const User = require('../models/user.js');
const Order = require("../models/order.js");

// getting user by id
exports.getUserById = (req, res, next, id) => {
    
    User.findById(id).exec((err, user)=>{  //For each db call there will be a user and an error response being generated.
        if(err){ //If there is an error or if no user is found the below snipet will be executed
            return res.status(400).json({
                error:"Error!!!"
            });
        }else if(!user){
            return res.status(400).json({
                error:"DB empty"
            });
        }
        req.profile = user;// Saving the fetched  user in the req.profile
        next();
    });
};

exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    return res.json(req.profile);
};

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate( 
        { _id : req.profile._id },//Getting the id and locating the user to which the data has to be updated
        { $set : req.body },// Updating the requested field received from the body
        { new : true, useFindAndModify: false},
        (err, user) => { // Every time a a request is sent to DB it produces a response with th error and the object itself
            if(err){
                return res.status(400).json({
                    error:"Update not successful"
                });
            }
            user.salt = undefined;
            user.encry_password = undefined;
            res.json(user);
        }
    );
};

exports.getUserPurchaseList = (req, res) => {
    Order.find({user: req.profile._id}) // finds all orders belonging to the particular user
    .populate("user", "_id name") // Place the _id and name to the "user" property in the OrderSchema
    .exec((err, order) => {
        if(err){
            return res.status(400).json({
                error : "No orders found"
            });
            
        }
        res.json(order); // Consists of all parameters of the orderSchema of the "user" whose _id and name are populated

    });

};

//Pushing the orders in purchase list
exports.pushOrderInPurchaseList = (req, res, next) => {
    let purchases = [] //Since in the user model the purchases is an array. So, it makes sense to have an array which can be then pushed to the user model
    req.body.order.products.forEach(product => { //looping through all the products and adding each product to the list aka Array
        purchases.push({
            _id:product._id, 
            name : prooduct.name,
            description : product.description,
            category : product.category,
            quantity : product.quantity,
            amount : req.body.order.amount, //Total cost of all products in a order
            transactio_id : req.body.order.transactio_id // Transaction_id of each order

        })
    })
    //Store in DB
    User.findOneAndUpdate(
        {_id : req.profile._id}, // Identifying the user using _id
        {$push : {purchases: purchases}}, // Updating the purchases array in the user model with a local purchase array
        {new : true},  // Whenever we access db we receieve 2 objects i.e err and the object itself. By setting the new to true it should return the updated object
        (err, purchases)=>{
            if(err){
                return res.status(400).json({
                    error : "Unable to save purchase list"
                })
            }
        }
        )
    next();
}