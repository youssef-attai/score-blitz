import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ProtectedRoute from "./components/ProtectedRoute";
import { SocketProvider } from "./contexts/SocketContext";
import HomePage from "./pages/HomePage";
import MatchPage from "./pages/MatchPage";
import WhoAreYouPage from "./pages/WhoAreYouPage";

export default createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "/whoru",
                element: <WhoAreYouPage />,
            },
            {
                path: "/:matchName",
                element: (
                    <ProtectedRoute>
                        <SocketProvider>
                            <MatchPage />
                        </SocketProvider>
                    </ProtectedRoute>
                ),
            },
        ],
    }
]);
