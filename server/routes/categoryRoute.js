import express from "express";
import { isAdmin, requireSignIn } from "../helpers/authMiddleware.js";
import { createCategory, deleteCategory, getAllCategories, getSingleCategory, updateCategory } from "../controllers/categoryController.js";


// Routes
const router = express.Router();

// createNew-category
router.post("/create-category", requireSignIn, isAdmin, createCategory);

// update existing-category
router.put("/update-category/:id", requireSignIn, isAdmin, updateCategory);

// delete-category
router.delete("/delete-category/:id", requireSignIn, isAdmin, deleteCategory);

// get all-categories
router.get("/getAll-categories", requireSignIn, getAllCategories);

// get single-category
router.get("/getSingle-category/:slug", requireSignIn, getSingleCategory);


export default router;