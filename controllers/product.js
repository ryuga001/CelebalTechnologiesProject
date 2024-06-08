import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/utility-class.js";
import Product from "../models/product.js"
export const CreateProduct = TryCatch(async (req, res, next) => {

    const { name, description, price, category, stock } = req.body;

    const newProduct = await Product.create({
        name,
        description,
        image: req.file?.path,
        price,
        category,
        stock
    })
    if (!newProduct) {
        return next(new ErrorHandler("product not created", 500));
    }
    return res.status(200).json({
        message: "Product created successfully",
        success: true,
    });
});
export const getProduct = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.find({ _id: id });
    if (!product) {
        return next(new ErrorHandler("product not found", 404));
    }
    return res.status(200).json({
        data: product,
        success: true,
    });
});
export const getAllProducts = TryCatch(async (req, res, next) => {
    const { category, search, minPrice, maxPrice } = req.query;
    const filter = {};
    if (search) {
        filter.name = { $regex: search, $options: 'i' };
    }

    if (category) {
        filter.category = category;
    }

    if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) {
            filter.price.$gte = minPrice;
        }
        if (maxPrice) {
            filter.price.$lte = maxPrice;
        }
    }
    const products = await Product.find(filter);
    if (!products) {
        return next(new ErrorHandler("products not found", 404));
    }
    return res.status(200).json({
        data: products,
        success: true,
    });
});
export const updateProduct = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const { name, description, price, category, stock } = req.body;
    const product = await Product.findByIdAndUpdate(id, { name, description, price, category, stock, image: req.file?.path },
        { new: true });
    if (!product) {
        return next(new ErrorHandler("product not updated", 500));
    }
    return res.status(200).json({
        message: "product updated successfully",
        success: true,
    });
});
export const deleteProduct = TryCatch(async (req, res, next) => {
    const { id } = req.params;

    await Product.findByIdAndDelete(id);

    return res.status(200).json({
        message: "product deleted successfully",
        success: true,
    });
});


