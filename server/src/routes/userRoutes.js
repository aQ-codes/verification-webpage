// src/routes/userRoutes.js
import express from "express";
import { createUser } from "../controllers/userController.js";

const router = express.Router();

// POST request to create a new user
router.post("/signup", createUser);

export default router;


