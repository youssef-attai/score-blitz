import express, { json } from "express";
import matchRouter from "./routers/match.js";
import authRouter from "./routers/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { CLIENT_URL } from "./env.js";
import server from "./server.js";
import { PORT } from "./env.js";
import connectDB from "./db.js"

const app = express();
import { setupSocketIO } from "./socketio.js";

connectDB();

app.use(cors({
    credentials: true,
    origin: CLIENT_URL,
}));
app.use(json());
app.use(cookieParser());

// Basic logger
app.use((req, _, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

app.use('/auth', authRouter);
app.use('/match', matchRouter);

setupSocketIO();

server.listen(PORT, () => {
    console.log("Server is running on http://localhost:3000");
});
