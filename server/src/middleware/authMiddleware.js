import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const isAuthenticated = async (req, res, next) => {
  const authToken = req.headers.authorization;

  // console.log("Headers:", req.headers);
  // console.log("Authorization header:", req.headers.authorization);

  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized - No token" });
  }

  const token = authToken?.split(" ")[1];
  console.log(token);

  if (!token) {
    return res.status(404).json({ message: "Unauthorized User" });
  }
  try {
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN);

    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};
