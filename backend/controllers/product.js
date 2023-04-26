const Product = require("../models/product");
const formidable = require("formidable"); // to get form data which can even include binary files
const _ = require("lodash"); //inbuilt functions for collections, arrays, to manipulate objects, and other utility methods
const fs = require("fs"); // file system used to access the files

exports.getProductById = (req, res, next, id) => {
    Product.findById(id).populate("category").exec((err, product) => {
        
        if (err) {
            console.log("Error")
            return res.status(400).json({
                error: "Error!!"
            });
        } else if (!product) {
            console.log("Error1")
            return res.status(400).json({
                error: "Product not found"
            });
        }
        req.product = product;
    })
    
    next();

};

exports.updateProduct = (req, res) => {
    let form = formidable.IncomingForm(); // We are gonna accept the form data which might be a file with binary data
    form.keepExtensions = true; // Allowing the extension i.e wrt photo (photo.jpg) here we are allowing the.jpg to be in the data

    form.parse(req, (err, fields, file) => { //parsing the file with the help of formidable
        // As a result of parse we would get 3 objects 1. Error 2. fields 3. file
        if (err) {
            return res.status(400).json({
                error: "Problem with image"
            });
        }
        //destructure the fields 
        const { price, description, name, stock, category } = fields;


        //updation code

        let product = req.product;
        product = _.extend(product, fields) // Only fields which are changed are updated
        //handle files
        if (file.photo) { // Objects of the file can be handled with the . operator
            if (file.photo.size > 3000000) { //checking the size of the photo 
                return res.status(400).json({
                    error: "Photo size too big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path); //Reading the file information and storing it in the local as given in the Model of Product
            product.photo.contentType = file.photo.type; //Setting the contentType of the photo 
        }

        //save to db
        product.save((err, product) => {
            if (err) {
                return res.status(400).json({
                    error: "Updation of product failed"
                });
            }
            res.json(product);
        })
    })





};

exports.getProduct = (req, res) => {
    console.log(req.product) // PRoblem is here
    
    return res.json(req.product)
};

//Handling binary data11

exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo, contentType)
        return res.send(req.product.photo.data)
    }
    next();
};

exports.deleteProduct = (req, res) => {
    
    let product = req.product;
    console.log(product)
    product.remove((err, deletedProduct) => {
        console.log("1 delete1")
        if (err) {
            return res.status(400).json({
                error: "Failed to delete product"
            });
        }

        res.json({
            message: "Deletion was successful",
            deletedProduct
        });
    });
};

exports.createProduct = (req, res) => {
    let form = formidable.IncomingForm();
   // console.log(form) // We are gonna accept the form data which might be a file with binary data
    form.keepExtensions = true; // Allowing the extension i.e wrt photo (photo.jpg) here we are allowing the.jpg to be in the data
    
    
    form.parse(req, (err, fields, file) => { //parsing the file with the help of formidable
        // As a result of parse we would get 3 objects 1. Error 2. fields 3. file
        
        if (err) {
            return res.status(400).json({
                error: "Problem with image"
            });
        }
        //destructure the fields 
        const { price, description, name, stock, category } = fields;
        
        if (
            !name ||
            !description ||
            !stock ||
            !price ||
            !category

        ) {
            return res.status(400).json({
                error: "Please include all fields"
            });

        }

        //Restrictions on fields

        let product = new Product(fields); // creating an object "products" by passing fields as parameter which was obtained as a result of parsing

        //handle files
        if (file.photo) { // Objects of the file can be handled with the . operator
            if (file.photo.size > 3000000) { //checking the size of the photo 
                return res.status(400).json({
                    error: "Photo size too big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path); //Reading the file information and storing it in the local as given in the Model of Product
            product.photo.contentType = file.photo.type; //Setting the contentType of the photo 
        }

        //save to db
        product.save((err, product) => {
            if (err) {
                return res.status(400).json({
                    error: "Saving Tshirt failed"
                });
            }
            res.json(product);
        })
    })
};

exports.getAllProducts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"
    Product.find()
        .select("-photo") //"-" indicates non-photos
        .populate("category")
        .limit(limit)
        .sort([[sortBy, "asc"]])
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: "No product found"
                })
            }
            res.json(products)
    })
};

exports.updateStock = (req, res, next) =>{
    let myOperations = req.body.order.products.map(prod =>{ //map is used to loop
        return{
            updateOne : {
                filter : {_id: prod.id},
                update : {$inc:{stock : -prod.count, sold: +prod.count}}
            }
        }
    })
    Product.bulkWrite(myOperations, {}, (err, products)=>{
        if(err){
            return res.status(400).json({
                error: "Bulk operation failed"
            })
        }
    });
    next();
}

exports.getAllUniqueCategories = (req, res) => {
    Product.distinct("category",{}, (err, category)=>{
        if(err){
            return res.status(400).json({
                error : "No category found"
            })
        }
        res.json(category);
    })
}
