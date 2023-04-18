import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Match from "./pages/Match";

export default createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:id",
    element: <Match />,
  },
]);
