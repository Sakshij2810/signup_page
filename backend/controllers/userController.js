import user from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//signup controller
export const signup = async (req, res) => {
  const { phone, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await user.findOne({ email });

    if (existingUser) {
      return res.status(404).json({ message: "User already Exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user in the database
    const newUser = await user.create({
      email,
      password: hashedPassword,
      phone,
    });
    console.log("newUser:", newUser); // Debug log

    // Generate JWT token
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET || "sercrete",
      { expiresIn: "1h" }
    );
    console.log("token:", token); // Debug log

    // Send success response
    return res.status(200).json({ result: newUser, token });
  } catch (error) {
    // Log the actual error for debugging
    console.error("Error during signup:", error.message); // Improved error logging
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
