import express from 'express';
import { singleUpload } from '../middlewares/multer.js';
import { CreateProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from '../controllers/product.js';
const router = express.Router();


router.post("/create", singleUpload, CreateProduct);
router.get("/all", getAllProducts)
router.route("/:id").get(getProduct).put(singleUpload, updateProduct).delete(deleteProduct)


export default router;