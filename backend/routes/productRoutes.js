import express from "express";
import { getSpecs, getSpecById } from "../controllers/productController.js";

const router = express.Router();

router.route("/").get(getSpecs);

router.route("/:id").get(getSpecById);

export default router;
