import express from "express";
import {
  getAddress,
  getAddressById,
  createAddress,
  deleteAddressById
} from "../controllers/addressController.js";

const router = express.Router();

router.route("/").get(getAddress).post(createAddress);

router.route("/:id").get(getAddressById).delete(deleteAddressById);

export default router;
