import { createContext, PropsWithChildren, useCallback, useContext, useState } from "react";
import { User } from "../types";
import * as authAPI from "../api/auth";

interface AuthContextType {
    user: User | null;
    me: () => Promise<void>;
    login: (username: string, password: string) => Promise<void>;
    create: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;

function useAuth() {
    return useContext(AuthContext);
}

export { useAuth };

function AuthProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState<User | null>(null);

    const me = useCallback(async function me() {
        setUser(await authAPI.me());
    }, []);

    const login = useCallback(async function login(username: string, password: string) {
        setUser(await authAPI.login(username, password));
    }, []);

    const create = useCallback(async function create(username: string, password: string) {
        setUser(await authAPI.create(username, password));
    }, []);

    const logout = useCallback(async function logout() {
        await authAPI.logout();
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider value={{ user, me, login, create, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider };
