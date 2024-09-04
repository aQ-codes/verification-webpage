
import User from '../models/userModel.js';

// Controller to fetch user information by ID
const UserInfoController = {
    getUserPhoneNumber: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json({ phoneNumber: user.phoneNumber || false });
        } catch (error) {
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    },

    getUserAadhaarNumber: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json({ aadharNumber: user.aadharNumber || false });
        } catch (error) {
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    },

    getUserPanNumber: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json({ panNumber: user.panNumber || false });
        } catch (error) {
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    },

    getUserBankAccountNumber: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json({ bankAccountNumber: user.bankAccountNumber || false });
        } catch (error) {
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    },

    getUserGSTIN: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json({ gstin: user.gstin || false });
        } catch (error) {
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    },

    getUserEmail: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json({ email: user.email || false });
        } catch (error) {
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    },
};

export default UserInfoController;
