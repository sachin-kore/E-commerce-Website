import express from "express";
import { requireSignIn, isAdmin } from "./../helpers/authMiddleware.js";
import { createProduct, getallProduct, getsinglrProduct, productPhoto, deleteProduct, updateProduct, FilterProducts, CountTotalProducts, perpageProducts, SearchedProducts } from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

// create product
router.post("/create-product", requireSignIn, isAdmin, formidable(), createProduct);

// update product
router.put("/update-product/:pid", requireSignIn, isAdmin, formidable(), updateProduct);

// getall product
router.get("/getall-products", getallProduct);


// getall product
router.get("/single-product/:slug", getsinglrProduct);

// getall product
router.get("/product-photo/:pid", productPhoto);

// delete product
router.delete("/delete-product/:pid", deleteProduct);

// filter products
router.post("/filter-product", FilterProducts);

// filter products
router.get("/count-Allproducts", CountTotalProducts);

// per page products
router.get("/per-page-products/:page", perpageProducts);

// searched products
router.get("/searched-products/:keyword", SearchedProducts);

export default router;