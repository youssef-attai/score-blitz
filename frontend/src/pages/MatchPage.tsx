import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../contexts/SocketContext";
import * as matchAPI from "../api/match";
import { Match } from "../types";

function MatchPage() {
    const socket = useSocket();

    const { matchName } = useParams();

    const [match, setMatch] = useState<Match | null>(null);
    const players = match?.players || [];

    useEffect(() => {
        if (matchName && socket) {
            matchAPI.getMatch(matchName).then((match) => {
                match && setMatch(match);
            });

            socket.emit("joinMatch", { matchName });
            socket.on("playerJoined", (player) => {
                setMatch((currentMatch) => {
                    if (!currentMatch) return null;
                    return {
                        ...currentMatch,
                        players: [...currentMatch.players, player],
                    };
                });
            });
        }

        return () => {
            socket && socket.off("playerJoined");
            socket && socket.emit("leaveMatch", { matchName });
        }
    }, [matchName, socket]);

    return (
        <div className="match-container">
            <div className="column">
                <div className="column-header">Actions</div>
                <div className="cards-scrollarea"></div>
                <button>New action</button>
            </div>
            <div className="column">
                <div className="column-header">Scoreboard</div>
                <div className="cards-scrollarea">
                    {players.map((player) => (
                        <div className="card" key={player.username}>
                            {player.username}: {player.score}
                        </div>
                    ))}
                </div>
                <button>End match</button>
            </div>
            <div className="column">
                <div className="column-header">History</div>
                <div className="cards-scrollarea"></div>
                <button>Settings</button>
            </div>
        </div>
    )
}

export default MatchPage
