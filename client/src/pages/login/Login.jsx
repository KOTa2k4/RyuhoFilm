import { useContext, useState } from "react"
import "./login.css"
import { login } from "../../authContext/apiCalls"
import { AuthContext } from "../../authContext/AuthContext"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { dispatch } = useContext(AuthContext)

    const handleLogin = (e) => {
        e.preventDefault();
        login({ email, password }, dispatch);
    }
    return (
        <div className="login">
            <div className="top">
                <div className="wrapper">
                    <img
                        className="logo"
                        src="https://images.ctfassets.net/y2ske730sjqp/1aONibCke6niZhgPxuiilC/2c401b05a07288746ddf3bd3943fbc76/BrandAssets_Logos_01-Wordmark.jpg?w=940"
                        alt=""
                    />

                </div>
            </div>
            <div className="container">
                <form>
                    <h1>Sign In</h1>
                    <input type="email" placeholder="Email or phone number" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button className="loginButton" onClick={handleLogin}>Sign In</button>
                    <span>
                        New to Netflix <b>Sign up now.</b>
                    </span>
                    <small>
                        This page is protected by Google reCAPTCHA to ensure you're not
                        a bot. <b>Learn more</b>.
                    </small>
                </form>
            </div>
        </div>
    )
}