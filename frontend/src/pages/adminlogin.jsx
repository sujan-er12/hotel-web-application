import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./adminlogin.css";

function AdminLogin() {

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
                "https://hotel-web-application-bmc5.onrender.com/api/admin/login",
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
                setMessage(data.message || "Invalid credentials");
                setLoading(false);
                return;
            }

            localStorage.setItem(
                "admin",
                JSON.stringify(data.admin)
            );

            navigate("/admin/dashboard");

        } catch (error) {

            setMessage(
                "Unable to connect to server. Please try again."
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="admin-login-page">

            {/* Background decoration */}
            <div className="admin-glow glow-one"></div>
            <div className="admin-glow glow-two"></div>

            <div className="admin-login-wrapper">

                {/* Left section */}
                <div className="admin-info">

                    <div className="admin-logo">
                        🏨
                    </div>

                    <h1>
                        Hotel<span>Admin</span>
                    </h1>

                    <p>
                        Manage your hotel operations,
                        bookings and users from one secure
                        dashboard.
                    </p>

                    <div className="admin-features">

                        <div>
                            <span>✓</span>
                            Manage Hotels
                        </div>

                        <div>
                            <span>✓</span>
                            Manage Bookings
                        </div>

                        <div>
                            <span>✓</span>
                            Manage Users
                        </div>

                    </div>

                </div>


                {/* Login glass card */}
                <div className="admin-glass-card">

                    <div className="login-header">

                        <div className="admin-icon">
                            🔐
                        </div>

                        <h2>Admin Login</h2>

                        <p>
                            Sign in to access the admin dashboard
                        </p>

                    </div>


                    <form onSubmit={handleSubmit}>

                        {/* Email */}
                        <div className="input-group">

                            <label>
                                Email Address
                            </label>

                            <div className="input-wrapper">

                                <span className="input-icon">
                                    ✉
                                </span>

                                <input
                                    type="email"
                                    placeholder="admin@hotel.com"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    required
                                />

                            </div>

                        </div>


                        {/* Password */}
                        <div className="input-group">

                            <label>
                                Password
                            </label>

                            <div className="input-wrapper">

                                <span className="input-icon">
                                    🔒
                                </span>

                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />

                            </div>

                        </div>


                        {/* Error */}
                        {message && (
                            <div className="admin-error">
                                ⚠ {message}
                            </div>
                        )}


                        {/* Login */}
                        <button
                            type="submit"
                            className="admin-login-btn"
                            disabled={loading}
                        >

                            {loading
                                ? "Signing in..."
                                : "Sign In"
                            }

                            {!loading && (
                                <span>→</span>
                            )}

                        </button>

                    </form>


                    <div className="security-note">

                        <span>🛡</span>

                        <p>
                            Secure administrator access
                        </p>

                    </div>

                </div>

            </div>

            <div className="admin-footer">
                © 2026 Hotel Management System
            </div>

        </div>
    );
}

export default AdminLogin;