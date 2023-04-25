import { connect } from "mongoose";
import { MONGO_URI } from "./env.js";

export default function() {
    console.log("Connecting to MongoDB...")
    connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log("MongoDB connected");
        })
        .catch((error) => {
            console.error("MongoDB connection error:", error);
        });
}
