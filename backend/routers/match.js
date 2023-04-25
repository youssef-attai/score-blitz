import { Router } from "express";
import Match from "../models/match.js";
import User from "../models/user.js";

const router = Router();

router.get("/:matchName", async (req, res) => {
    const { matchName } = req.params;

    const match = await Match.findOne({ name: matchName });

    if (!match) {
        return res.status(404).json({ error: "Match not found" });
    }

    const organizer = await User.findOne({ _id: match.organizer });
    const players = match.players.map(async (player) => {
        const user = await User.findOne({ _id: player._id });
        return {
            username: user.username,
            _id: user._id,
            score: player.score,
        };
    });

    res.status(200).json({
        _id: match._id,
        name: match.name,
        organizer: {
            username: organizer.username,
            _id: organizer._id,
        },
        players: await Promise.all(players),
        status: match.status
    });
});

router.post("/", async (req, res) => {
    const { matchName, organizer } = req.body;

    const user = await User.findOne({ username: organizer });

    const match = new Match({
        name: matchName,
        organizer: user._id,
    });

    try {
        await match.save();
        res.status(201);
    } catch (error) {
        if (error.code == 11000) {
            res.status(400).json({ error: "Match name already exists" });
        } else {
            res.status(500).json({ error: "Something went wrong" });
        }
    }
});

export default router;
