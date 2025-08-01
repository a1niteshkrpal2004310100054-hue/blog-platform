import { User } from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

// Generate Access Token
const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN, { expiresIn: "15m" });
};

// Generate Refresh Token
const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN, { expiresIn: "1h" });
};

// register user
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username && !email && !password) {
      return res.status(403).json({ message: "Please fields are required" });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(401).json({ message: "User already exist" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });

    console.log("newUser", newUser);
    await newUser.save();
    return res
      .status(200)
      .json({ data: newUser, message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// LoginUser

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email && !password) {
      return res.status(403).json({ message: "Please fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Please enter correct password" });
    }
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 10 * 24 * 60 * 60 * 1000,
    });

    return res
      .status(200)
      .json({ data: user, accessToken, message: "User loggedin successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// export const editProfile = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const { username, password, bio, email } = req.body;

//     const user = await User.findOne({ userId });
//     if (!user) {
//       return res.status(400).json({ message: "User Not found" });
//     }

//     if (username) user.username = username;
//     if (bio) user.bio = bio;
//   } catch (error) {
//     return res.status(500).json({ message: "Internal Server Error", error });
//   }
// };

export const userLogout = async (_, res) => {
  try {
    res.clearCookie("refreshtoke", "");
    return res.status(200).json("user looged out succesfully");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Logout Error" });
  }
};
