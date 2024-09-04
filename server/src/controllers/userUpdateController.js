import User from '../models/userModel.js';

// Controller to update user information by ID
const UserUpdateController = {
    // Update Aadhaar verification status
    updateUserAadhaarVerification: async (req, res) => {
        const { userId } = req.params;
        const { verifyAadhaar } = req.body;

        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Update the verifyAadhaar field
            user.verifyAadhaar = verifyAadhaar;
            await user.save();

            return res.status(200).json({ message: 'Aadhaar verification status updated successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error updating Aadhaar verification status' });
        }
    },

    // Update PAN number
    updateUserPanNumber: async (req, res) => {
        const { userId } = req.params;
        const { panNumber } = req.body;

        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Update the panNumber field
            user.panNumber = panNumber;
            await user.save();

            return res.status(200).json({ message: 'PAN number updated successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error updating PAN number' });
        }
    },

    // Update GSTIN
    updateUserGstin: async (req, res) => {
        const { userId } = req.params;
        const { gstin } = req.body;

        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Update the gstin field
            user.gstin = gstin;
            await user.save();

            return res.status(200).json({ message: 'GSTIN updated successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error updating GSTIN' });
        }
    },

    // Update Bank Account Number
    updateUserBankAccountNumber: async (req, res) => {
        const { userId } = req.params;
        const { bankAccountNumber } = req.body;

        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Update the bankAccountNumber field
            user.bankAccountNumber = bankAccountNumber;
            await user.save();

            return res.status(200).json({ message: 'Bank account number updated successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error updating bank account number' });
        }
    },

    // Update Email
    updateUserEmail: async (req, res) => {
        const { userId } = req.params;
        const { email } = req.body;

        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Update the email field
            user.email = email;
            await user.save();

            return res.status(200).json({ message: 'Email updated successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error updating email' });
        }
    },

    // Update Phone Number
    updateUserPhoneNumber: async (req, res) => {
        const { userId } = req.params;
        const { phoneNumber } = req.body;

        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Update the phoneNumber field
            user.phoneNumber = phoneNumber;
            await user.save();

            return res.status(200).json({ message: 'Phone number updated successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error updating phone number' });
        }
    }
};

export default UserUpdateController;
