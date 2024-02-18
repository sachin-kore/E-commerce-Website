import productModel from "./../models/productModel.js"
import slugify from "slugify"
import fs from "fs";

// create products
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, quantity } = req.fields;
        const { photo } = req.files;

        // validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: "Photo is Required and it should be less than 1MB" });
        }

        const products = new productModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }

        await products.save();
        res.status(200).send({
            success: true,
            message: "Product created successfully",
            products
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error while creating product"
        })
    }
}


/// get all products

export const getallProduct = async (req, res) => {
    try {
        const products = await productModel
            .find({})
            .populate("category")
            .select("-photo")
            .limit(12)
            .sort({ createdAt: -1 });
        res.status(201).send({
            success: true,
            count: products.length,
            message: "Product fetched successfully",
            products
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error while fetching products"
        })
    }
}

// get single product

export const getsinglrProduct = async (req, res) => {
    try {

        const singleProduct = await productModel
            .findOne({ slug: req.params.slug })
            .select("-photo")
            .populate("category");
        res.status(200).send({
            success: true,
            message: "Single product fetched",
            singleProduct
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error while getting single product",
            error
        })
    }
}

//get photo

export const productPhoto = async (req, res) => {

    try {

        const product = await productModel.findById(req.params.pid).select("photo");
        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error while fetching photo",
            error
        })

    }

}

// delete product
export const deleteProduct = async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        if (!product) {
            return res.status(401).send({ success: false, message: "product not found" });
        }
        res.status(200).send({
            success: true,
            message: "Product deleted successfully",
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error while deleting product",
            error
        })

    }
}


// update product

export const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } =
            req.fields;
        const { photo } = req.files;
        //alidation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: "photo is Required and should be less then 1mb" });
        }

        const products = await productModel.findByIdAndUpdate(
            req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Updated Successfully",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in Updte product",
        });
    }
};

// Filter products

export const FilterProducts = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        const args = {};
        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            products
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "error in filltering products",
            error
        })
    }
}

// products count
export const CountTotalProducts = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            message: "Fetched all products lenght",
            total
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Counting products",
            error
        })
    }
}


// product list based on per page

export const perpageProducts = async (req, res) => {
    try {
        const perpage = 6;
        const page = req.params.page ? req.params.page : 1;
        const perPageProducts = await productModel.
            find({})
            .select('-photo')
            .skip((page - 1) * perpage)
            .limit(perpage)
            .sort({ createdAt: -1 });
        if (!perPageProducts) res.status(401).send({
            success: false,
            message: "error while fetching per page products",
        });
        res.status(200).send({
            success: true,
            message: " fetched per page products",
            products: perPageProducts,

        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error while fetching per page products",
            error
        })
    }
}

// searched products

export const SearchedProducts = async (req, res) => {
    try {
        const { keyword } = req.params;
        console.log(keyword);
        const products = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        }).select("-photo");
        res.status(200).send({
            success: true,
            message: "Searched products",
            products
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "error in searching products",
            error
        })
    }
}