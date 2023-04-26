const express = require("express");
const router = express.Router();

const { getProductById, createProduct, getProduct, photo, deleteProduct, updateProduct, getAllProducts, getAllUniqueCategories} = require("../controllers/product.js");
const { getUserById } = require("../controllers/user.js");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth.js");


router.param("productId", getProductById);
router.param("userId", getUserById);

router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct);

router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

//DeleteProduct routes

router.delete("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteProduct);

// Update product route
router.put("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, updateProduct);

//Listing route

router.get("/products", getAllProducts);

router.get("/products/categories", getAllUniqueCategories)

module.exports = router;