import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// @desc:   Authenticate user & get token
// @route:  POST /api/users/login
// @access: Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    // Generate JWT web token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    // Set JWT as HTTP-Only Cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in ms
    });
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid username or password");
  }
});

// @desc:   Register user
// @route:  POST /api/users
// @access: Public
const registerUser = asyncHandler(async (req, res) => {
  res.send("register user");
});

// @desc:   Logout user & clear http-only cookie
// @route:  POST /api/users/logout
// @access: Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// @desc:   Get user profile
// @route:  GET /api/users/profile
// @access: Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("get user profile");
});

// @desc:   Update user profile
// @route:  PUT /api/users/profile
// @access: Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update user profile");
});

// @desc:   Get users
// @route:  GET /api/users
// @access: Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("get users");
});

// @desc:   Get user by ID
// @route:  GET /api/users/:id
// @access: Private/Admin
const getUserByID = asyncHandler(async (req, res) => {
  res.send("get user by id");
});

// @desc:   Delete users
// @route:  DELETE /api/users/:id
// @access: Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete users");
});

// @desc:   Update users
// @route:  PUT /api/users/:id
// @access: Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("update users");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserByID,
  updateUser,
};
