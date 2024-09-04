import User from "../models/userModel.js";

export const createUser = async (req, res) => {
    try {
        console.log("entered controller");
        console.log(req.body);
        const { name, email, phoneNumber, aadharNumber, dateOfBirth } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const newUser = new User({
            name,
            email,
            phoneNumber,
            aadharNumber,
            dateOfBirth
        });

        const savedUser = await newUser.save();

        return res.status(201).json({
            message: "User created successfully",
            success: true,
            savedUser
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};
