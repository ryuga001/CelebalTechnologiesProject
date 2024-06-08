import { TryCatch } from "../middlewares/error.js";
import Order from "../models/order.js"
import ErrorHandler from "../utils/utility-class.js";

export const getOrders = TryCatch(async (req, res, next) => {
    const orders = await Order.find({ user: req.userId }).populate('items.product');

    if (!orders) {
        return next(new ErrorHandler("Thers is no order from this user"), 404);
    }

    return res.status(200).json({
        data: orders,
        success: true,
    });
});

export const createOrder = TryCatch(async (req, res, next) => {

    const { address, items, paymentStatus, totalAmount } = req.body;

    const order = await Order.create({
        user: req.userId,
        address,
        items,
        paymentStatus,
        totalAmount
    });

    if (!order) {
        return next(new ErrorHandler("Order not placed", 500));
    }

    return res.status(200).json({
        message: "order successfully placed",
        success: true,
        data: order
    });
});