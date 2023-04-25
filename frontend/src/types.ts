export interface User {
    _id: string;
    username: string;
    token: string
}

export interface Match {
    _id: string;
    name: string;
    organizer: {
        username: string;
        _id: string;
    };
    players: {
        username: string;
        _id: string;
        score: number;
    }[];
    status: "new" | "playing" | "ended";
}

