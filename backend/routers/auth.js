import { Router } from "express";
import { randomBytes } from "crypto";
import User from "../models/user.js";

const router = Router();

router.get("/me", async (req, res) => {
    const { token } = req.cookies;
    console.log("token:", token);

    if (!token) {
        console.log("No token is found", token);
        return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findOne({ token });

    // There might be a token in the cookie, but it might not be valid
    if (!user) {
        console.log("Invalid token", token);
        return res.status(401).json({ message: "Unauthorized" });
    }

    console.log("User found:", user);
    return res.status(200).json({
        username: user.username,
    });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    console.log("username:", username);
    console.log("password:", password);

    const user = await User.findOne({ username, password });

    console.log("user:", user);

    if (user) {
        console.log("User found:", user);

        user.token = randomBytes(64).toString("hex");
        await user.save();

        console.log("User updated:", user);

        res.cookie("token", user.token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7
        });

        return res.status(200).json({
            username: user.username
        });
    }

    console.log("Invalid credentials");

    return res.status(401).json({ message: "Invalid credentials" });
});

router.post("/create", async (req, res) => {
    const { username, password } = req.body;

    console.log("username:", username);
    console.log("password:", password);

    const newUser = new User({ username, password });
    newUser.token = randomBytes(64).toString("hex");
    await newUser.save();

    console.log("newUser:", newUser);

    res.cookie("token", newUser.token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7
    });

    return res.status(200).json({
        username: newUser.username
    });
});

router.get('/logout', (_, res) => {
    res.clearCookie('token');

    console.log('User logged out');

    return res.sendStatus(200);
});

export default router;
