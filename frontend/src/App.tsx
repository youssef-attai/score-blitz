import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "./contexts/Auth";
import useAsync from "./hooks/useAsync";

function App() {
    const { me } = useAuth();

    const { execute, status } = useAsync(me, false);

    useEffect(() => {
        execute()
            .then(() => {})
            .catch(() => {});
    }, []);

    if (status === "pending") {
        return <div>Loading...</div>;
    }

    return <Outlet />;
}

export default App;
