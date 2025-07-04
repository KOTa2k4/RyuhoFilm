import axios from "axios";
import "./register.css"
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {

    const [email, setEmail] = useState("")
    /*const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")*/
    const history = useNavigate();

    const emailRef = useRef()
    const passwordRef = useRef()
    const usernameRef = useRef()

    const handleStart = () => {
        setEmail(emailRef.current.value)
    }
    const handleFinish = async (e) => {
        e.preventDefault();
        const finalUsername = usernameRef.current.value;
        const finalPassword = passwordRef.current.value;

        try {
            await axios.post("auth/register", {
                email,
                username: finalUsername,
                password: finalPassword
            });
            history("/login")
        } catch (err) {
        }
    }

    return (
        <div className="register">
            <div className="top">
                <div className="wrapper">
                    <img
                        className="logo"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" alt="" />
                    <button className="loginButton" >Sign In</button>
                </div>
            </div>
            <div className="container">
                <h1>Unlimited movies, TV shows, and more.</h1>
                <h2>Watch anywhere. Cancel anytime.</h2>
                <p>Ready to watch? Enter your email to creat or restart your membership.</p>
                {
                    !email ? (
                        <div className="input">
                            <input type="email" placeholder="email address" ref={emailRef} />
                            <button className="registerButton" onClick={handleStart}>Get started</button>
                        </div>
                    ) : (
                        <form className="input">
                            <input type="username" placeholder="username" ref={usernameRef} />
                            <input type="password" placeholder="password" ref={passwordRef} />

                            <button className="registerButton" onClick={handleFinish}>Start</button>
                        </form>
                    )}
            </div>
        </div>
    )
}