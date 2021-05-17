import express from 'express'
import {getUsers, getUserById, createUser, authUser, getUserProfile, registerUser} from '../controllers/userController.js'
import protect from '../middlewares/authMiddlewares.js'

const router = express.Router();

router.route("/").post(registerUser)
router.route("/login").post(authUser)
router.route("/profile").get(protect, getUserProfile)

// router.route("/:id").get(getUserById);

export default router;
