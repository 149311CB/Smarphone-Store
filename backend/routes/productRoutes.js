import express from "express";
const router = express.Router();
import {
  getSpecs,
  getSpecById,
  createProduct,
  deleteProductById,
  getSpecsForCart,
  getSimilarProduct,
  createReviews
} from "../controllers/productController.js";
import protect from "../middlewares/authMiddlewares.js"


router.route("/").get(getSpecs).post(createProduct);
router.get("/similars", getSimilarProduct)
router.route("/localcart/:id").get(getSpecsForCart)
router.route("/:id/reviews").post(protect,createReviews)
router.route("/:id").get(getSpecById).delete(deleteProductById);

export default router;
