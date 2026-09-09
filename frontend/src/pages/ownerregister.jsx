import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ownerregister.css";

function OwnerRegister() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        try {
            const response = await fetch(
                "http://127.0.0.1:5000/api/owner/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(form)
                }
            );

            const data = await response.json();

            setMessage(data.message);

            if (response.ok) {
                setTimeout(() => {
                    navigate("/owner/login");
                }, 1200);
            }
        } catch (error) {
            setMessage("Unable to connect to server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="owner-register-page">

            <div className="register-card">

                {/* Left Side */}
                <div className="register-info">

                    <div className="brand">
                        <div className="brand-icon">🏨</div>
                        <span>HotelHub</span>
                    </div>

                    <div className="info-content">
                        <span className="small-title">
                            HOTEL MANAGEMENT PLATFORM
                        </span>

                        <h1>
                            Grow your hotel
                            <span> business with us.</span>
                        </h1>

                        <p>
                            Manage your hotel, rooms, bookings and guests
                            from one powerful platform.
                        </p>

                        <div className="features">

                            <div className="feature">
                                <div className="feature-icon">✓</div>
                                <div>
                                    <strong>Easy Hotel Management</strong>
                                    <p>Manage your property effortlessly.</p>
                                </div>
                            </div>

                            <div className="feature">
                                <div className="feature-icon">✓</div>
                                <div>
                                    <strong>Manage Bookings</strong>
                                    <p>Track reservations in one place.</p>
                                </div>
                            </div>

                            <div className="feature">
                                <div className="feature-icon">✓</div>
                                <div>
                                    <strong>Business Dashboard</strong>
                                    <p>Monitor your hotel performance.</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="copyright">
                        © 2026 HotelHub. All rights reserved.
                    </div>

                </div>

                {/* Right Side */}
                <div className="register-form-section">

                    <div className="form-wrapper">

                        <div className="mobile-brand">
                            <div className="brand-icon">🏨</div>
                            <span>HotelHub</span>
                        </div>

                        <div className="form-heading">
                            <span className="welcome">GET STARTED</span>

                            <h2>Create Owner Account</h2>

                            <p>
                                Register your hotel owner account to get started.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>

                            <div className="input-group">
                                <label>Owner Name</label>

                                <div className="input-box">
                                    <span>👤</span>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter your full name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label>Email Address</label>

                                <div className="input-box">
                                    <span>✉</span>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label>Phone Number</label>

                                <div className="input-box">
                                    <span>📱</span>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Enter phone number"
                                        value={form.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label>Password</label>

                                <div className="input-box">
                                    <span>🔒</span>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Create a password"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="register-btn"
                                disabled={loading}
                            >
                                {loading ? "Creating Account..." : "Create Account"}
                                {!loading && <span>→</span>}
                            </button>

                        </form>

                        {message && (
                            <div className="register-message">
                                {message}
                            </div>
                        )}

                        <div className="login-link">
                            Already have an account?
                            <Link to="/owner/login">
                                Sign in
                            </Link>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default OwnerRegister;