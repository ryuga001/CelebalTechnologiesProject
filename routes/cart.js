import express from 'express';
import { addProduct, getAllCartProducts, removeProduct } from '../controllers/cart.js';
import { isAuthenticatedUser } from '../middlewares/auth.js';

const router = express.Router();

router.get("/all", isAuthenticatedUser, getAllCartProducts)
router.route("/update").post(isAuthenticatedUser, addProduct)
router.route("/:id").delete(isAuthenticatedUser, removeProduct)

export default router;