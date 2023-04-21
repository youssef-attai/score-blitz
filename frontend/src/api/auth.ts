import { User } from "../types";

export async function me(): Promise<User | null> {
    const response = await fetch('http://localhost:3000/auth/me', {
        credentials: 'include',
    });

    if (response.status === 401) {
        return null;
    } else if (response.status !== 200) {
        throw new Error('Unexpected response');
    }

    const user = await response.json() as User
    console.log(user);

    return user;
}

export async function login(username: string, password: string): Promise<User | null> {
    const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (response.status === 401) {
        return null;
    } else if (response.status !== 200) {
        throw new Error('Unexpected response');
    }

    const user = await response.json() as User;
    console.log(user);

    return user;
}

export async function create(username: string, password: string): Promise<User> {
    const response = await fetch('http://localhost:3000/auth/create', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (response.status !== 200) {
        throw new Error('Unexpected response');
    }

    const user = await response.json() as User
    console.log(user);

    return user;
}

export async function logout(): Promise<void> {
    const response = await fetch('http://localhost:3000/auth/logout', {
        credentials: 'include',
    });

    if (response.status !== 200) {
        throw new Error('Unexpected response');
    }
}
