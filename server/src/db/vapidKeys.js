import dotenv from "dotenv";

dotenv.config();

module.exports = {
  email: process.env.VAPID_EMAIL,
  privateKey: process.env.VAPID_PRIVATE_KEY,
  publicKey: process.env.VAPID_PUBLIC_KEY,
};
