import { APIError, RequestStatus, User } from "../types";
import * as authAPI from "../api/auth";
import useAsync from "../hooks/useAsync";
import { createContext, PropsWithChildren, useState } from "react";

interface AuthContextType {
    user: User | null;

    me: () =>  Promise<void>;
    meError: APIError | null;
    meValue: User | null;
    meStatus: RequestStatus;

    login: (username: string, password: string) => Promise<void>;
    loginError: APIError | null;
    loginValue: User | null;
    loginStatus: RequestStatus;

    create: (username: string, password: string) => Promise<void>;
    createError: APIError | null;
    createValue: User | null;
    createStatus: RequestStatus;

    logout: () => void;
    logoutError: APIError | null;
    logoutStatus: RequestStatus;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

function AuthProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState<User | null>(null);

    const {
        execute: me,
        error: meError,
        value: meValue,
        status: meStatus,
    } = useAsync<User, APIError>(async function() {
        const freshUser = await authAPI.me();
        setUser(freshUser);
        return freshUser;
    }, false);

    const {
        execute: login,
        error: loginError,
        value: loginValue,
        status: loginStatus,
    } = useAsync<User, APIError>(async function(username: string, password: string) {
        const freshUser = await authAPI.login(username, password);
        setUser(freshUser);
        return freshUser;
    }, false);

    const {
        execute: create,
        error: createError,
        value: createValue,
        status: createStatus,
    } = useAsync<User, APIError>(async function(username: string, password: string) {
        const freshUser = await authAPI.create(username, password);
        setUser(freshUser);
        return freshUser;
    }, false);

    const {
        execute: logout,
        error: logoutError,
        value: _,
        status: logoutStatus,
    } = useAsync<void, APIError>(async function() {
        await authAPI.logout();
        setUser(null);
    }, false);

    return (
        <AuthContext.Provider value={{ 
            user,
            me, meError, meValue, meStatus,
            login, loginError, loginValue, loginStatus,
            create, createError, createValue, createStatus,
            logout, logoutError, logoutStatus,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider };
export default AuthContext;
