import express from "express";
import User from "../models/User.js";
import { registerValidation, loginValidation } from "../validation.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
    // Validate data
    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Check if the user is already in the DB
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
        return res.status(400).send("Email already exists");
    }

    // Hash passwords
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);

    // Create a new user
    const user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        password: hashedPassword,
    });

    try {
        const savedUser = await user.save();
        res.send({ user: savedUser._id });
    } catch (err) {
        res.send(err);
    }
});

// Login
router.post("/login", async (req, res) => {
    // Validate data
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Check if the email already exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send("Email or Password is wrong");
    }

    // If password is correct
    const validPass = await bcryptjs.compare(req.body.password, user.password);
    if (!validPass) {
        return res.status(400).send("Email or Password is wrong");
    }

    // Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send(token);
});

export default router;
