import { useRef, useEffect, useState, createContext, PropsWithChildren, useContext } from "react";
import io, { Socket } from "socket.io-client";
import useAuth from "../hooks/useAuth";

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: PropsWithChildren) => {
    const { user } = useAuth();
    const [isConnected, setIsConnected] = useState(false);
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        if (!user) return;
        const socket = io("http://localhost:3000", {
            auth: {
                username: user.username,
                token: user.token,
            },
        });
        socketRef.current = socket;

        const onConnect = () => {
            setIsConnected(true);
        };

        const onDisconnect = () => {
            setIsConnected(false);
        };

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);

        return () => {
            socket.disconnect();
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socketRef.current = null;
        };
    }, [user]);

    return (
        <SocketContext.Provider value={isConnected ? socketRef.current : null}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    return useContext(SocketContext);
};
