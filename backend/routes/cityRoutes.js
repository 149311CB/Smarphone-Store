import express from "express";
import {
  getCity,
  getCityById,
} from "../controllers/cityController.js";

const router = express.Router();

router.route("/").get(getCity)

router.route("/:id").get(getCityById)

export default router;
