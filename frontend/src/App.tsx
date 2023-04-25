import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import useAuth from "./hooks/useAuth";

function App() {
    const { me, meStatus, meValue, user } = useAuth();

    useEffect(() => {
        if (meStatus === "idle" && (!user || !meValue)) {
            me();
        }
    }, [meStatus]);

    return (
        <>
            <Navbar />
            {
                (meStatus === "pending") ? (
                    <div>Loading...</div>
                ) : (
                    <Outlet />
                )
            }
        </>
    );
}

export default App;
