import { Router } from "express";
import { randomBytes } from "crypto";
import User from "../models/user.js";

const router = Router();

router.get("/me", async (req, res) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findOne({ token });

    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    return res.status(200).json({
        _id: user._id,
        username: user.username,
        token: user.token
    });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    user.token = randomBytes(64).toString("hex");
    await user.save();

    res.cookie("token", user.token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7
    });

    return res.status(200).json({
        _id: user._id,
        username: user.username,
        token: user.token
    });
});

router.post("/create", async (req, res) => {
    const { username, password } = req.body;

    const newUser = new User({ username, password });
    newUser.token = randomBytes(64).toString("hex");

    try {
        await newUser.save();
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "Username already exists" });
        } else {
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    res.cookie("token", newUser.token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7
    });

    return res.status(200).json({
        _id: newUser._id,
        username: newUser.username,
        token: newUser.token
    });
});

router.get('/logout', (_, res) => {
    res.clearCookie('token');

    return res.sendStatus(200);
});

export default router;
