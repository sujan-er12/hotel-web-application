import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./userlogin.css";

function UserLogin() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        try {
            const response = await fetch(
                "https://hotel-web-application-bmc5.onrender.com/api/user/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || "Invalid email or password");
                setLoading(false);
                return;
            }

            // Save logged-in user
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            // Go to dashboard
            navigate("/user/userdashboard");

        } catch (error) {
            console.error("Login error:", error);
            setMessage("Unable to connect to server");
        }

        setLoading(false);
    };

    return (
        <div className="auth-container">

            <div className="auth-box">

                <h1>User Login</h1>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                {message && (
                    <p className="login-message">
                        {message}
                    </p>
                )}

                <p>
                    Don't have an account?{" "}
                    <Link to="/user/register">
                        Register
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default UserLogin;