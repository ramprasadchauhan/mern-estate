import express from "express";
import {
  deleteUser,
  test,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyUser } from "../utills/verifyUser.js";

const router = express.Router();
router.get("/test", test);
router.post("/update/:id", verifyUser, updateUser);
router.post("/delete/:id", verifyUser, deleteUser);

export default router;
