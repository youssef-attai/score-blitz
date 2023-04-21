import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Match from "./pages/Match";
import WhoAreYou from "./pages/WhoAreYou";

export default createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />,
            },

            {
                path: "/:matchName",
                element: <Match />,
            },
            {
                path: "/whoru",
                element: <WhoAreYou />,
            },
        ]
    }
]);
