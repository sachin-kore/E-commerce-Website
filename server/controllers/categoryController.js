import slugify from "slugify"
import categoryModel from "../models/categoryModel.js";

export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) return res.send({ message: "category name is required" });
        const existName = await categoryModel.findOne({ name });
        if (existName) {
            return res.send({ message: "category already  exists" });
        } else {
            const newItem = await new categoryModel({
                name,
                slug: slugify(name)
            }).save();

            res.status(200).send({
                success: true,
                message: " created successfully",
                category: newItem
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "error while creating category"
        })

    }
}

/// update category

export const updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        if (!name) return res.send({ message: "category name is required" });
        const existingCategory = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });
        console.log(existingCategory);

        res.status(200).send({
            success: true,
            message: "Category updated successfully",
            category: existingCategory
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "error while updating category"
        })

    }
}

///
export const getAllCategories = async (req, res) => {
    try {
        const allCategories = await categoryModel.find({});

        res.status(200).send({
            success: true,
            message: "successfully fetched all category",
            categories: allCategories
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "error while fetching all categories"
        })

    }
}

///
export const getSingleCategory = async (req, res) => {
    try {
        const singleCategory = await categoryModel.findOne({ slug: req.params.slug });

        res.status(200).send({
            success: true,
            message: "successfully get single category",
            category: singleCategory
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "error while fetching single category"
        })

    }
}

//
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const existCategory = await categoryModel.findByIdAndDelete(id);

        if (existCategory) {
            res.status(200).send({
                success: true,
                message: "Category deleted successfully"
            })
        }

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "error while deleting category"
        })

    }
}