import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as matchAPI from "../api/match";
import useAsync from "../hooks/useAsync";
import useAuth from "../hooks/useAuth";

function HomePage() {
    const {
        user,
        logout
    } = useAuth();

    const navigate = useNavigate();

    const createMatchNameRef = useRef<HTMLInputElement>(null);
    const joinMatchNameRef = useRef<HTMLInputElement>(null);

    const { execute: createMatch, status: createMatchStatus } = useAsync(async () => {
        if (createMatchNameRef.current && createMatchNameRef.current.value !== "" && user) {
            if (await matchAPI.create(createMatchNameRef.current.value, user.username)) {
                navigate(`/${createMatchNameRef.current.value}`);
            }
        }
    }, false);

    function logoutOnClick() {
        logout();
    }

    function joinOnClick() {
        navigate(`/${joinMatchNameRef.current?.value}`);
    }

    function createOnClick() {
        createMatch().then(() => { }).catch(() => { });
    }

    function editProfileOnClick() {
        console.log("edit profile");
    }

    return (
        <>
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

export default HomePage;
