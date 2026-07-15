import express from "express";
import User from '../models/user.js'
import jwt from "jsonwebtoken";
import auth from "../middlewere/auth.middle.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import validate from "../middleware/validate.middle.js";
import { loginSchema, signupSchema } from "../schema/auth.schema.js";
const router = express.Router();
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;



// Handling post request
router.post("/login", validate(loginSchema), async (req, res, next) => {
  let { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch {
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }

  if (!existingUser) {
    const error = Error("Wrong details please check at once");
    error.statusCode = 401;
    return next(error);
  }

  const passwordMatches = await bcrypt.compare(password, existingUser.password);
  if (!passwordMatches) {
    const error = new Error("Wrong details please check at once");
    error.statusCode = 401;
    return next(error);
  }

  let token;
  try {
    //Creating jwt token
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
  } catch (err) {
    console.log(err);
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }


  res.status(200).json({
    success: true,
    data: {
      userId: existingUser.id,
      email: existingUser.email,
      token: token,
      first_name: existingUser.first_name,
      last_name: existingUser.last_name,
    },
  });
});

// Handling post request
router.post("/signup", validate(signupSchema), async (req, res, next) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      credits: 1000000,
      stocks: [],
    });

    try {
      await newUser.save();
    } catch (err) {
      if (err.code === 11000) {
        const error = new Error("User already exists");
        error.statusCode = 409;
        return next(error);
      }
      return next(err);
    }

    let token;
    try {
      token = jwt.sign(
        { userId: newUser.id, email: newUser.email },
        SECRET_KEY,
        { expiresIn: "1h" }
      );
    } catch (err) {
      return next(err);
    }

    res.status(201).json({
      success: true,
      data: {
        userId: newUser.id,
        email: newUser.email,
        token: token,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
      },
    });
  } catch (err) {
    return next(err);
  }
});

router.delete('/logout', auth, async (req, res, next) => {
  console.log("User logged out ", req.user);
  res.status(200).json({ success: true, message: "Logged out successfully" });
});

export default router;