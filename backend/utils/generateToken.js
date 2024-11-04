// utils/generateToken.js
import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const setCookie = (res, token) => {
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // Millisecond format
    httpOnly: true, // prevent XSS cross-site scripting attack
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development"
  });
};