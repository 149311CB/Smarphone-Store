import express from "express";
import {
  getWarranty,
  getWarrantyById,
  createWarranty,
  deleteWarrantyById
} from "../controllers/warrantyController.js";

const router = express.Router();

router.route("/").get(getWarranty).post(createWarranty);

router.route("/:id").get(getWarrantyById).delete(deleteWarrantyById);

export default router;
