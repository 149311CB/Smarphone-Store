import express from "express";
const router = express.Router();
import {
  getSpecs,
  getSpecById,
  createProduct,
  deleteProductById,
  getSpecsForCart,
  getSimilarProduct
} from "../controllers/productController.js";


router.get("/similars", getSimilarProduct)
router.route("/localcart").post(getSpecsForCart)
router.route("/").get(getSpecs).post(createProduct);

router.route("/:id").get(getSpecById).delete(deleteProductById);

export default router;
