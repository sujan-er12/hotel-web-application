import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ownerlogin.css";

function OwnerLogin() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");

        if (!email || !password) {
            setMessage("Please enter your email and password.");
            return;
        }

        try {

            setLoading(true);

            const response = await fetch(
                "https://hotel-web-application-bmc5.onrender.com/api/owner/login",
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
                setMessage(
                    data.message || "Invalid email or password."
                );

                return;
            }

            /*
             * Save owner information
             */

            localStorage.setItem(
                "owner",
                JSON.stringify(data.owner)
            );

            /*
             * Optional remember email
             */

            if (rememberMe) {

                localStorage.setItem(
                    "ownerEmail",
                    email
                );

            } else {

                localStorage.removeItem(
                    "ownerEmail"
                );
            }

            /*
             * Go to dashboard
             */

            navigate("/owner/dashboard");

        } catch (error) {

            console.error(error);

            setMessage(
                "Unable to connect to the server. Please try again."
            );

        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="owner-login-page">

            <div className="login-card">


                {/* =================================================
                    LEFT SIDE
                ================================================= */}

                <div className="login-visual">


                    {/* Brand */}

                    <div className="hotel-brand">

                        <div className="brand-logo">
                            H
                        </div>

                        <div>

                            <h3>
                                HotelHub
                            </h3>

                            <span>
                                Management Platform
                            </span>

                        </div>

                    </div>


                    {/* Main Content */}

                    <div className="visual-content">

                        <div className="tag">
                            HOTEL OWNER PORTAL
                        </div>


                        <h1>
                            Manage your
                            <br />

                            <span>
                                hotel smarter.
                            </span>
                        </h1>


                        <p>
                            Everything you need to manage rooms,
                            reservations, guests and your hotel
                            business — all in one place.
                        </p>


                        {/* Statistics */}

                        <div className="stats">

                            <div className="stat">

                                <strong>
                                    24/7
                                </strong>

                                <span>
                                    Access
                                </span>

                            </div>


                            <div className="stat-line"></div>


                            <div className="stat">

                                <strong>
                                    100%
                                </strong>

                                <span>
                                    Secure
                                </span>

                            </div>


                            <div className="stat-line"></div>


                            <div className="stat">

                                <strong>
                                    Easy
                                </strong>

                                <span>
                                    Management
                                </span>

                            </div>

                        </div>

                    </div>


                    {/* Bottom */}

                    <div className="visual-bottom">

                        <span>
                            ●
                        </span>

                        Secure hotel management platform

                    </div>

                </div>



                {/* =================================================
                    RIGHT SIDE
                ================================================= */}

                <div className="login-form-section">


                    <div className="login-form">


                        {/* Mobile Brand */}

                        <div className="mobile-brand">

                            <div className="brand-logo">
                                H
                            </div>

                            <div>

                                <h3>
                                    HotelHub
                                </h3>

                                <span>
                                    Management Platform
                                </span>

                            </div>

                        </div>



                        {/* Header */}

                        <div className="login-header">

                            <div className="eyebrow">
                                WELCOME BACK
                            </div>

                            <h2>
                                Owner Login
                            </h2>

                            <p>
                                Sign in to access your hotel dashboard.
                            </p>

                        </div>



                        {/* Form */}

                        <form onSubmit={handleSubmit}>


                            {/* Email */}

                            <div className="field">

                                <label htmlFor="email">
                                    Email address
                                </label>

                                <div className="input-wrapper">

                                    <span className="input-icon">
                                        ✉
                                    </span>

                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        autoComplete="email"
                                    />

                                </div>

                            </div>



                            {/* Password */}

                            <div className="field">

                                <div className="password-label">

                                    <label htmlFor="password">
                                        Password
                                    </label>

                                    <button
                                        type="button"
                                        className="forgot-btn"
                                        onClick={() =>
                                            setMessage(
                                                "Please contact the administrator to reset your password."
                                            )
                                        }
                                    >
                                        Forgot password?
                                    </button>

                                </div>


                                <div className="input-wrapper">

                                    <span className="input-icon">
                                        🔒
                                    </span>


                                    <input
                                        id="password"
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        autoComplete="current-password"
                                    />


                                    <button
                                        type="button"
                                        className="show-password"
                                        onClick={() =>
                                            setShowPassword(
                                                !showPassword
                                            )
                                        }
                                    >
                                        {showPassword
                                            ? "Hide"
                                            : "Show"}
                                    </button>

                                </div>

                            </div>



                            {/* Error Message */}

                            {message && (

                                <div className="error-message">

                                    <span>
                                        !
                                    </span>

                                    {message}

                                </div>

                            )}



                            {/* Remember */}

                            <div className="remember-row">

                                <label className="remember">

                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) =>
                                            setRememberMe(
                                                e.target.checked
                                            )
                                        }
                                    />

                                    <span>
                                        Remember me
                                    </span>

                                </label>


                                <span className="secure">
                                    🔐 Secure login
                                </span>

                            </div>



                            {/* Login Button */}

                            <button
                                type="submit"
                                className="login-button"
                                disabled={loading}
                            >

                                {loading ? (

                                    <>
                                        <span className="spinner"></span>

                                        Signing in...

                                    </>

                                ) : (

                                    <>
                                        Sign in to dashboard

                                        <span className="arrow">
                                            →
                                        </span>
                                    </>

                                )}

                            </button>

                        </form>



                        {/* Register */}

                        <div className="register-section">

                            <span>
                                Don't have an owner account?
                            </span>

                            <Link to="/owner/register">
                                Create account
                            </Link>

                        </div>



                        {/* Footer */}

                        <div className="login-footer">

                            © 2026 HotelHub
                            <span> • </span>
                            Privacy
                            <span> • </span>
                            Terms

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default OwnerLogin;