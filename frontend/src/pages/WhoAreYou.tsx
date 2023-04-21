import { useRef } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth";

function WhoAreYou() {
    const {
        user,
        login,
        create,
    } = useAuth();

    if (user) {
        return <Navigate to="/" />;
    }

    const newUsernameRef = useRef<HTMLInputElement>(null);
    const newPasswordRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    async function loginOnClick() {
        if (usernameRef.current &&
            usernameRef.current.value !== "" &&
            passwordRef.current &&
            passwordRef.current.value !== "") {
            await login(usernameRef.current.value, passwordRef.current.value);
        }
    }

    async function createOnClick() {
        if (newUsernameRef.current &&
            newUsernameRef.current.value !== "" &&
            newPasswordRef.current &&
            newPasswordRef.current.value !== "") {
            await create(newUsernameRef.current.value, newPasswordRef.current.value);
        }
    }

    return (
        <div>
            <h1>Who are you?</h1>
            <div>
                <h6>i'm a new user</h6>
                <div className="profile-pic">
                    <img src="" alt="" />
                </div>
                <input ref={newUsernameRef} type="text" placeholder="username" />
                <input ref={newPasswordRef} type="password" placeholder="password" />
                <button onClick={createOnClick}>Create</button>
            </div>
            <div>
                <h6>i have an account</h6>
                <input ref={usernameRef} type="text" placeholder="username" />
                <input ref={passwordRef} type="password" placeholder="password" />
                <button onClick={loginOnClick} >Login</button>
            </div>
        </div>
    );
}

export default WhoAreYou;
