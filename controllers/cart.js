import { TryCatch } from "../middlewares/error.js";
import Cart from "../models/cart.js"
import ErrorHandler from "../utils/utility-class.js";

export const getAllCartProducts = TryCatch(async (req, res, next) => {
    const cartItems = await Cart.find({ user: req.userId }).populate('items.product');

    return res.status(200).json({
        data: cartItems,
        success: true,
    });
});
export const addProduct = TryCatch(async (req, res, next) => {
    const { productId } = req.body;
    let cart = await Cart.findOne({ user: req.userId });
    if (cart) {

        cart.items.push({ product: productId });

    } else {
        cart = new Cart({ user: req.userId, items: [{ product: productId }] });
    }
    await cart.save();
    if (!cart) {
        return next(new ErrorHandler("not added", 500));
    }
    return res.status(200).json({
        message: "item added successfully",
        success: true,
        data: cart,
    });
});
export const removeProduct = TryCatch(async (req, res, next) => {

    const { id } = req.params
    let cart = await Cart.findOne({ user: req.userId });
    if (cart) {
        cart.items = cart.items.filter(item => item.product.toString() !== id);
        await cart.save();
    } else {
        next(new ErrorHandler("cart is empty", 404));
    }

    return res.status(200).json({
        message: "item deleted successfully",
        success: true,
    });
});
