import express from "express";
import protect from "../middlewares/authMiddlewares.js";
import {
  getAddress,
  getAddressById,
  createAddress,
  deleteAddressById,
  getPrimaryAddressByUserId,
  getCityList,
  getAddressesByUser,
  updateAddress
} from "../controllers/addressController.js";

const router = express.Router();

router.route("/").get(protect, getAddressesByUser).post(protect, createAddress)
router.route("/primary").get(protect, getPrimaryAddressByUserId)

router.route("/:id")
  .get(getAddressById)
  .delete(protect, deleteAddressById)
  .post(protect, updateAddress);
router.route("/cities").get(getCityList)

export default router;
