import express from "express";
import {getSpecs, getSpecById, createProduct, deleteProductById} from "../controllers/productController.js";

const router = express.Router();

router.route("/").get(getSpecs).post(createProduct);

router.route("/:id").get(getSpecById).delete(deleteProductById);

export default router;
