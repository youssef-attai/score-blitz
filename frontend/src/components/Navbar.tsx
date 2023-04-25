import { useLocation, useParams } from "react-router-dom";

function Navbar() {
    const location = useLocation();
    const { matchName } = useParams();

    if (location.pathname !== "/") {
        return (
            <div className="navbar">
                <div className="small-logo"></div>
                <h1>{matchName}</h1>
                <div className="github-icon"></div>
            </div>
        )
    } else {
        return (
            <div className="navbar">
                <div className="logo"></div>
            </div>
        )
    }
}

export default Navbar;
