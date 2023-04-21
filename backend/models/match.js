import { Schema, model } from "mongoose";

const matchSchema = new Schema({
    name: { type: String, unique: true },
    organizer: { name: String },
    players: {
        type: [{ name: String, score: Number }],
        default: [],
    },
    actions: {
        type: [{ description: String, points: Number }],
        default: [],
    },
    status: {
        type: String,
        enum: ["new", "playing", "ended"],
        default: "new",
    },
});

export default model("Match", matchSchema);
