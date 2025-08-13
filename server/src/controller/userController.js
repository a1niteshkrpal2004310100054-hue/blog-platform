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
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN, { expiresIn: "2h" });
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
      secure: true,
      sameSite: "lax",
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

export const getUser = async (req, res) => {
  const userId = req.user.userId;

  if (!userId) {
    return res.status(404).json({ message: "User not found" });
  }
  try {
    const user = await User.findById(userId).select("-password -blogs");
    return res.status(200).json({ message: "Accepted", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const editProfile = async (req, res) => {
  const userId = req.params.id;
  console.log(userId, "userID");
  const { username, bio, email } = req.body;

  try {
    const user = await User.findById(userId).select("-password -blogs");
    console.log("user", user);
    if (!user) {
      return res.status(400).json({ message: "User Not found" });
    }

    if (username) user.username = username;
    if (bio) user.bio = bio;
    // if (password) {
    //   const matchPassword = await bcrypt.compare(user.password, password);
    //   if (matchPassword) {
    //     const hashPassword = await bcrypt.hash(password, 10);
    //     user.password = hashPassword;
    //   }
    // }
    if (req.file) {
      const host = req.protocol + "://" + req.host;
      user.avatar = `${host}/uploads/${req.file.filename}`;
    }

    if (email) user.email = email;

    await user.save();

    return res.status(200).json({ message: "fields modified", user });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const userLogout = async (_, res) => {
  try {
    res.clearCookie("refreshtoken", "");
    return res.status(200).json("user looged out succesfully");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Logout Error" });
  }
};

export const refresh = async (req, res) => {
  const token = req.cookies.refreshToken;

  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Missing Refresh Token" });
  }

  jwt.verify(token, process.env.REFRESH_TOKEN, (error, payload) => {
    if (error) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    // console.log("payload", payload);
    const accessToken = generateAccessToken(payload.userId);
    const refreshToken = generateRefreshToken(payload.userId);
    console.log(accessToken);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 10 * 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  });
};
