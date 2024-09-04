// src/routes/userRoutes.js
import express from "express";
import { createUser } from "../controllers/userController.js";
import UserInfoController from "../controllers/userInfoController.js"
import UserUpdateController from "../controllers/userUpdateController.js";

const router = express.Router();

// POST request to create a new user
router.post("/signup", createUser);

// Routes to fetch user information
router.get('/phone/:id', UserInfoController.getUserPhoneNumber);
router.get('/aadhaar/:id', UserInfoController.getUserAadhaarNumber);
router.get('/pan/:id', UserInfoController.getUserPanNumber);
router.get('/bank/:id', UserInfoController.getUserBankAccountNumber);
router.get('/gstin/:id', UserInfoController.getUserGSTIN);
router.get('/email/:id', UserInfoController.getUserEmail);

// Individual PUT routes for updating each field
router.put('/:userId/verify-aadhaar', UserUpdateController.updateUserAadhaarVerification);
router.put('/:userId/update-pan', UserUpdateController.updateUserPanNumber);
router.put('/:userId/update-gstin', UserUpdateController.updateUserGstin);
router.put('/:userId/update-bank-account', UserUpdateController.updateUserBankAccountNumber);
router.put('/:userId/update-email', UserUpdateController.updateUserEmail);
router.put('/:userId/update-phone', UserUpdateController.updateUserPhoneNumber);

export default router;


