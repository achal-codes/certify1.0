const express = require("express");
const router = express.Router();

//Objects which are to be imported from other modules
const {getCategoryById, createCategory, getCategory, getAllCategories, updateCategory, removeCategory} = require("../controllers/category.js");
const {isAuthenticated, isSignedIn, isAdmin} = require("../controllers/auth.js");
const {getUserById} = require("../controllers/user.js");


//params
router.param("userId", getUserById); 

router.param("categoryId", getCategoryById);

// routes
//Create category route. Only the admin has access to create new category
router.post("/category/create/:userId", isSignedIn, isAuthenticated, isAdmin, createCategory); 
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategories);
router.put("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, updateCategory);
router.delete("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, removeCategory);

//Exporting the module

module.exports = router;