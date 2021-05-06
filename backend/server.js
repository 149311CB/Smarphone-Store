import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import discountRoutes from './routes/discountRoutes.js'
import warrantyRoutes from './routes/warrantyRoutes.js'
import addressRoutes from './routes/addressRoutes.js'
import cityRoutes from './routes/cityRoutes.js'

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
