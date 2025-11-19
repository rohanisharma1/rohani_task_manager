import bcrypt from "bcryptjs";
import asyncHandler from "../middlewares/asyncHandler.js";
import prisma from "../db/prisma.js";
import generateToken from "../utils/generateToken.js";

const buildAuthPayload = (user, token) => ({
  user: {
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    profilePicture: user.profilePicture,
  },
  token,
});

const signupUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  const existUser = await prisma.user.findUnique({ where: { email } });
  if (existUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      firstname,
      lastname,
      email,
      password: hashedPassword,
    },
  });

  const token = generateToken(newUser.id);

  res.status(201).json({
    success: true,
    ...buildAuthPayload(newUser, token),
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    existingUser.password
  );

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken(existingUser.id);

  res.status(200).json(buildAuthPayload(existingUser, token));
});

const logoutUser = asyncHandler(async (_req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});

export { signupUser, loginUser, logoutUser };
