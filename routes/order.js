import express from 'express';
import { isAuthenticatedUser } from '../middlewares/auth.js';
import { createOrder, getOrders } from '../controllers/order.js';
const router = express.Router();

router.route("/").get(isAuthenticatedUser, getOrders).post(isAuthenticatedUser, createOrder);

export default router;