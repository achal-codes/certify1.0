const Category = require("../models/category.js");

// Get category by id
exports.getCategoryById = (req, res, next, id) => { //A middleware to get the categoryID 

    Category.findById(id).exec((err, cate)=>{
        if(err){
            return res.status(400).json({
                error : "Category not found"
            })
        }
        req.category = cate;
    })
    next();
};

//create new category
exports.createCategory= (req, res) => { // To crate new category
    const category = new Category(req.body); // Aliasing the category and assigning it to new Category which is obtained by /models/category.js
    category.save((err, category)=>{ // to save the new aliased category. Om successful interaction with DB 2 new objects error and the object itself is generated
        if(err){
            return res.status(400).json({
                error: "Not able to create a new category"
            })
        }
        res.json({category});
    });
};


// Getting all categories
exports.getAllCategories = (req, res) => {
    Category.find().exec((err, categories) => { //find() method fetches all the elements
        if(err || !categories){
            return res.status(400).json({
                error:"No categories"});
        }
        res.json(categories);
    });
};

//Getting the category
exports.getCategory = (req, res) => {
    return res.json(req.category);
};


//Updating the category

exports.updateCategory = (req, res)=>{
    const category = req.category; // From GetCategoryById we are able to find the category using id got as parameter and to locate where the update has to be placed
    category.name = req.body.name; // The field that has to be updated
    category.save((err, updatedCategory)=>{ 
        if(err){
            return res.status(400).json({
                error: "Not able to create a new category"
            })
        }
        res.json({updatedCategory});
    });

}

//Removing the category

exports.removeCategory = (req, res) => {
    const category = req.category; // Getting the category from the middleware(getCategoryById) and storing it in a local
    category.remove((err, category)=>{
        if(err){
            return res.status(400).json({
                error: "Not able to remove the category"
            })
        }
        res.json({
            message : "Successfully deleted ",
            catDeleted : category.name
    });
})
}
