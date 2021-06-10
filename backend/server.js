import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import path from 'path'
import {errorHandler} from './middlewares/errorMiddlewares.js'
import productRoutes from "./routes/productRoutes.js";
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import discountRoutes from './routes/discountRoutes.js'
import warrantyRoutes from './routes/warrantyRoutes.js'
import addressRoutes from './routes/addressRoutes.js'
import cityRoutes from './routes/cityRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import ultilsRouter from './routes/ultilsRoutes.js'
import orderDetailRoutes from './routes/orderDetailRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config();

connectDB();

const app = express();

app.use(express.json())

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/discounts", discountRoutes);
app.use("/api/warranties", warrantyRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/ultils", ultilsRouter);
app.use("/api/carts", cartRoutes);
app.use("/api/orderdetails", orderDetailRoutes)
app.use("/api/upload", uploadRoutes)

app.use("/api/config/paypal", (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))
app.use("/api/config/stripe", (req, res) => res.send(process.env.STRIPE_PUBLIC_KEY))

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
