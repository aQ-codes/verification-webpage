
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your full name"],
        unique: false,
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: [true, "Please provide your phone number"],
        unique: true,
    },
    aadharNumber: {
        type: String,
        unique: true,
    },
    dateOfBirth: {
        type: Date,
        required: [true, "Please provide your date of birth"]
    },
    panNumber: {
        type: String,
        unique: true,
    },
    gstin: {
        type: String,
        unique: true,
    },
    bankAccountNumber: {
        type: String,
        unique: true,
    },
    verifyAadhaar: {
        type: Boolean,
        default: false, 
    }
    // verifyToken: String,
    // verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
