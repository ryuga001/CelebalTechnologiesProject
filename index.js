import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { errorMiddleware } from "./middlewares/error.js";
import UserRoutes from "./routes/user.js";
import ProductRoutes from "./routes/product.js";
import CartRoutes from "./routes/cart.js";
import OrderRoutes from "./routes/order.js";

dotenv.config();
const PORT = process.env.PORT || 8000;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: "*",
    credentials: true,
}));
app.use("/user", UserRoutes)
app.use("/product", ProductRoutes)
app.use("/cart", CartRoutes)
app.use("/order", OrderRoutes)

app.use(errorMiddleware)

mongoose.connect(`${process.env.MONGO_URI}`).then(() => {
    app.listen(PORT, () => {
        console.log(`SERVER IS RUNNING AT ${PORT}`)
    })
}).catch(err => console.log(err));

