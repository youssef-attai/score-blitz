import { Schema, model } from "mongoose";

const matchSchema = new Schema({
    name: { type: String, unique: true },
    organizer: { type: Schema.Types.ObjectId, ref: "User" },
    players: {
        type: [{
            player: { type: Schema.Types.ObjectId, ref: "User" },
            score: { type: Number, default: 0 },
        }],
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
