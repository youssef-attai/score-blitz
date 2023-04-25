import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function ProtectedRoute({ children }: PropsWithChildren) {
    const { user, meStatus } = useAuth();

    if (meStatus === "idle" || meStatus === "pending") {
        return <>Loading...</>;
    }

    if (!user) {
        return <Navigate to="/whoru" />;
    }

    return <> {children} </>;
}

export default ProtectedRoute;
