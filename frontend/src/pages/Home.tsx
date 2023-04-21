import { useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/Auth";

function Home() {
    const createMatchNameRef = useRef<HTMLInputElement>(null);
    const joinMatchNameRef = useRef<HTMLInputElement>(null);

    const {
        user,
        logout
    } = useAuth();

    function logoutOnClick() {
        logout();
    }

    function joinOnClick() {
        console.log("join", joinMatchNameRef.current?.value);
    }

    function createOnClick() {
        console.log("create", createMatchNameRef.current?.value);
    }

    function editProfileOnClick() {
        console.log("edit profile");
    }

    return (
        <>
            <div className="logo"></div>
            {!user && (
                <p>You're not logged in, <Link to="/whoru">click here to login.</Link></p>
            )}
            {user && (
                <div>
                    <div className="profile-pic">
                        <img src="" alt="" />
                    </div>
                    <h6>{user.username}</h6>
                    <button onClick={editProfileOnClick}>Edit profile</button>
                    <button onClick={logoutOnClick}>Logout</button>
                </div>
            )}
            <div>
                <h6>Create a new match</h6>
                <input ref={createMatchNameRef} type="text" placeholder="match name" />
                <button onClick={createOnClick}>Create</button>
            </div>
            <div>
                <h6>Join an existing match</h6>
                <input ref={joinMatchNameRef} type="text" placeholder="match name" />
                <button onClick={joinOnClick}>Join</button>
            </div>
        </>
    );
}

export default Home;
