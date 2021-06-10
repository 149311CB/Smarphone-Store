import express from 'express'
import {
  getUsers, createUser, authUser, getUserProfile, registerUser,
  updateUserProfile, getUserList, deleteUser, getUserById, updateUserById
} from '../controllers/userController.js'
import protect from '../middlewares/authMiddlewares.js'

const router = express.Router();

router.route("/").get(protect, getUserList).post(registerUser)
router.route("/login").post(authUser)
router.route("/profile").get(protect, getUserProfile)
  .post(protect, updateUserProfile)

router.route("/:id")
  .get(protect, getUserById)
  .delete(protect, deleteUser)
  .put(protect, updateUserById);

export default router;
