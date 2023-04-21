import { Router } from "express";
import Match from "../models/match.js";

const router = Router();

// Create a new match
router.post("/", async (req, res) => {
    // To create a match, we need to know the name of the match, the name of the organizer.
    // Every match starts with no players.
    const { name, organizer } = req.body;
    const match = new Match({
        name,
        organizer: { name: organizer },
    });

    try {
        await match.save();
        res.status(201).json(match);
    } catch (error) {
        if (error.code == 11000) {
            res.status(400).json({ error: "Match name already exists" });
        } else {
            res.status(500).json({ error: "Something went wrong" });
        }
    }
});

// Join an existing match
router.post("/:matchId", async (req, res) => {
    // To join a match, we need to know the ID of the match, and the name of the player.
    const { matchId } = req.params;
    const { name } = req.body;

    try {
        const match = await findById(matchId);
        if (!match) {
            return res.status(404).json({ error: "Match not found" });
        }

        if (match.players.find((player) => player.name === name)) {
            return res.status(400).json({ error: "Player already exists" });
        }

        match.players.push({ name });
        await match.save();
        res.json(match);
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ error: "Invalid match ID" });
        } else {
            res.status(500).json({ error: "Something went wrong" });
        }
    }
});

export default router;
