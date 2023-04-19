import { connect } from "mongoose";
import express, { json } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import matchRouter from "./routers/match.js";
import authRouter from "./routers/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import * as dotenv from "dotenv";
dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server);

connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

app.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
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

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
