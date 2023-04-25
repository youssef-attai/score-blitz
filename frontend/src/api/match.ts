import { Match } from "../types";

export async function getMatch(matchName: string): Promise<Match> { 
    const response = await fetch(`http://localhost:3000/match/${matchName}`, {
        method: "GET",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.status !== 200) {
        throw new Error("Failed to get match");
    }

    return await response.json() as Match;
}

export async function create(matchName: string, organizer: string): Promise<boolean> {
    const response = await fetch(`http://localhost:3000/match`, {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            matchName,
            organizer,
        }),
    });

    if (response.status !== 201) {
        return false;
    }

    return true;
}
