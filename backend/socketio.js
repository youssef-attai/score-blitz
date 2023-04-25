import { Server } from "socket.io";
import server from "./server.js";

import User from "./models/user.js";
import Match from "./models/match.js";

import { CLIENT_URL } from "./env.js";

const io = new Server(server, {
    cors: {
        origin: CLIENT_URL,
        credentials: true,
    },
});

export const setupSocketIO = () => {
    io.on("connection", async (socket) => {
        const { username, token } = socket.handshake.auth;
        console.log(`${username} connected`);

        socket.on("joinMatch", async ({ matchName }) => {
            const user = await User.findOne({ token: token });
            if (!user) {
                console.log("User not found");
                return;
            }

            const match = await Match.findOne({ name: matchName });
            if (!match) {
                console.log("Match not found");
                return;
            }

            const organizer = await User.findOne({ _id: match.organizer });

            if (organizer._id.toString() === user._id.toString()) {
                socket.join(matchName);
                console.log("Organizer cannot join match");
                return;
            }

            if (match.players.find((player) => player._id.toString() === user._id.toString())) {
                socket.join(matchName);
                console.log(user.username, "already joined match");
                return;
            }

            match.players.push(user._id);
            await match.save();

            socket.join(matchName);
            console.log(`${user.username} joined match`);

            io.to(matchName).emit("playerJoined", {
                username: user.username,
                id: user._id,
                score: 0,
            });
        });

        socket.on("disconnect", () => {
            console.log(`${username} disconnected`);
        });
    });
}

export default io;
