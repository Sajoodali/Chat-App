import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { genrerateToken } from "../lib/utills.js";

export const singin = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All feilds are required." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must br at least 6 characters." });
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
      genrerateToken(newUser._id, res);
      await newUser.save();

      res.status(201).josn({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilepic: newUser.porfilePic,
      });
    } else {
      rea.status(400).josn({ message: "Invalide user Data." });
    }
  } catch (error) {
    console.log("Error in singup controllers", error.message);
    res.status(500).json({ message: "Internal server Error." });
  }
};

export const login = (req, res) => {};

export const logout = (req, res) => {};
