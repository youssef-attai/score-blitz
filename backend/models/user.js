import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: { type: String, unique: true },
    password: String,
    token: String,
});

export default model("User", userSchema);
