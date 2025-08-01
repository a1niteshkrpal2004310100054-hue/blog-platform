import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.refreshToken;
  // console.log(token);
  if (!token) {
    return res.status(404).json({ message: "Unauthorized User" });
  }
  try {
    const decode = jwt.verify(token, process.env.REFRESH_TOKEN);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};
