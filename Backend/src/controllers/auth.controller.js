import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utills.js";

export const singup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters." });
    }
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user Data." });
    }
  } catch (error) {
    console.log("Error in singup controllers", error.message);
    res.status(500).json({ message: "Internal server Error." });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", email, password);
  try {
    const user = await User.findOne({ email });
    console.log("User found:", user); 

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    console.log("Password matched:", isPasswordMatched); 
    
    if (!isPasswordMatched) {
      return res.status(400).json({ message: "Invalid email or password." });
    }
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Error in login controllers", error.message);
    res.status(500).json({ message: "Internal server Error." });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    console.error("Error in logout controllers", error.message);
    res.status(500).json({ message: "Internal server Error." });
  }
};
