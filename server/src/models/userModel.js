// backend/models/user.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your full name"],
        unique: false,
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: [true, "Please provide your phone number"],
        unique: true,
    },
    aadharNumber: {
        type: String,
        required: [true, "Please provide your aadhar number"],
        unique: true,
    },
    dateOfBirth: {
        type: Date,
        required: [true, "Please provide your date of birth"]
    },
    isVerfied: {
        type: Boolean,
        default: false,
    },
    verifyToken: String,
    verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
