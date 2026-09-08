import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";

import UserLogin from "./pages/userlogin";
import UserRegister from "./pages/userregister";

import OwnerLogin from "./pages/ownerlogin";
import OwnerRegister from "./pages/ownerregister";

import AdminLogin from "./pages/adminlogin";

import UserDashboard from "./pages/userdashboard";


import "./App.css";


function Home() {

    return (

        <div className="home-page">

            {/* Background decoration */}

            <div className="glow glow-one"></div>
            <div className="glow glow-two"></div>
            <div className="glow glow-three"></div>


            {/* ================= NAVBAR ================= */}

            <header className="navbar">

                <Link to="/" className="brand">

                    <div className="brand-icon">
                        H
                    </div>

                    <div className="brand-text">

                        <strong>HotelHub</strong>

                        <span>
                            HOTEL BOOKING
                        </span>

                    </div>

                </Link>


                <nav className="nav-menu">

                    <Link to="/">
                        Home
                    </Link>

                    <Link to="/user/login">
                        Guest
                    </Link>

                    <Link to="/owner/login">
                        Hotel Owners
                    </Link>

                    <Link to="/admin/login">
                        Admin
                    </Link>

                </nav>


                <Link
                    to="/user/login"
                    className="nav-button"
                >
                    Book a Hotel
                    <span>→</span>
                </Link>

            </header>


            {/* ================= HERO ================= */}

            <main className="hero-section">

                <div className="hero-left">

                    <div className="hero-badge">

                        <span className="status-dot"></span>

                        SMART HOTEL BOOKING PLATFORM

                    </div>


                    <h1>

                        Your stay.
                        <br />

                        <span>
                            Your comfort.
                        </span>

                        <br />

                        Your way.

                    </h1>


                    <p className="hero-description">

                        Discover beautiful hotels, find comfortable
                        rooms and book your perfect stay with ease.
                        Everything you need for a seamless hotel
                        experience in one place.

                    </p>


                    <div className="hero-actions">

                        <Link
                            to="/user/login"
                            className="primary-button"
                        >

                            Find a Hotel

                            <span className="button-arrow">
                                →
                            </span>

                        </Link>


                        <Link
                            to="/owner/register"
                            className="secondary-button"
                        >

                            List Your Hotel

                        </Link>

                    </div>


                    {/* Trust information */}

                    <div className="trust-section">

                        <div className="trust-avatars">

                            <span>👨</span>
                            <span>👩</span>
                            <span>👨</span>
                            <span>👩</span>

                        </div>

                        <div>

                            <div className="stars">
                                ★★★★★
                            </div>

                            <p>
                                Trusted by hotel guests & owners
                            </p>

                        </div>

                    </div>

                </div>


                {/* ================= HERO RIGHT ================= */}

                <div className="hero-right">

                    <div className="hotel-card">

                        {/* Image */}

                        <div className="hotel-image-wrapper">

                            <img
                                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=90"
                                alt="Luxury hotel"
                            />

                            <div className="image-overlay"></div>


                            {/* Image top */}

                            <div className="image-top">

                                <span className="featured-badge">
                                    ✦ FEATURED
                                </span>

                                <button className="heart-button">
                                    ♡
                                </button>

                            </div>


                            {/* Image bottom */}

                            <div className="image-bottom">

                                <div>

                                    <span className="location">
                                        📍 Bengaluru, India
                                    </span>

                                    <h3>
                                        Grand Luxury Hotel
                                    </h3>

                                </div>

                                <div className="rating">
                                    <strong>
                                        4.9
                                    </strong>

                                    <span>
                                        ★
                                    </span>
                                </div>

                            </div>

                        </div>


                        {/* Card information */}

                        <div className="hotel-info">

                            <div className="hotel-details">

                                <div>
                                    <span>
                                        🛏
                                    </span>

                                    <small>
                                        Rooms
                                    </small>

                                    <strong>
                                        120+
                                    </strong>
                                </div>


                                <div>
                                    <span>
                                        ⭐
                                    </span>

                                    <small>
                                        Rating
                                    </small>

                                    <strong>
                                        4.9/5
                                    </strong>
                                </div>


                                <div>
                                    <span>
                                        🏆
                                    </span>

                                    <small>
                                        Service
                                    </small>

                                    <strong>
                                        Premium
                                    </strong>
                                </div>

                            </div>


                            <Link
                                to="/user/login"
                                className="card-button"
                            >
                                Explore Hotels
                                <span>→</span>
                            </Link>

                        </div>

                    </div>


                    {/* Floating notification */}

                    <div className="floating-card booking-notification">

                        <div className="floating-icon">
                            ✓
                        </div>

                        <div>

                            <strong>
                                Booking confirmed
                            </strong>

                            <span>
                                Your room is ready
                            </span>

                        </div>

                    </div>


                    {/* Floating rating */}

                    <div className="floating-card rating-card">

                        <span className="mini-star">
                            ★
                        </span>

                        <div>

                            <strong>
                                4.9 / 5
                            </strong>

                            <span>
                                Excellent rating
                            </span>

                        </div>

                    </div>

                </div>

            </main>


            {/* ================= FEATURES ================= */}

            <section className="features-section">

                <div className="feature-card">

                    <div className="feature-icon">
                        🏨
                    </div>

                    <div>
                        <h3>
                            Premium Hotels
                        </h3>

                        <p>
                            Find comfortable and trusted
                            hotels for your stay.
                        </p>
                    </div>

                </div>


                <div className="feature-card">

                    <div className="feature-icon">
                        🔐
                    </div>

                    <div>
                        <h3>
                            Secure Booking
                        </h3>

                        <p>
                            Safe and reliable reservation
                            experience.
                        </p>
                    </div>

                </div>


                <div className="feature-card">

                    <div className="feature-icon">
                        ⚡
                    </div>

                    <div>
                        <h3>
                            Easy Management
                        </h3>

                        <p>
                            Hotel owners can manage rooms
                            and reservations easily.
                        </p>
                    </div>

                </div>


                <div className="feature-card">

                    <div className="feature-icon">
                        💬
                    </div>

                    <div>
                        <h3>
                            24/7 Support
                        </h3>

                        <p>
                            Get assistance whenever you
                            need it.
                        </p>
                    </div>

                </div>

            </section>


            {/* ================= BOTTOM CTA ================= */}

            <section className="bottom-section">

                <div>

                    <span>
                        FOR HOTEL OWNERS
                    </span>

                    <h2>
                        Grow your hotel business
                        with HotelHub.
                    </h2>

                </div>


                <Link
                    to="/owner/register"
                    className="owner-button"
                >
                    Become a Hotel Partner
                    <span>→</span>
                </Link>

            </section>


            {/* ================= FOOTER ================= */}

            <footer className="footer">

                <div className="footer-brand">

                    <div className="small-brand-icon">
                        H
                    </div>

                    <strong>
                        HotelHub
                    </strong>

                </div>


                <p>
                    © 2026 HotelHub. All rights reserved.
                </p>


                <div className="footer-links">

                    <span>
                        Privacy
                    </span>

                    <span>
                        Terms
                    </span>

                    <span>
                        Support
                    </span>

                </div>

            </footer>

        </div>
    );
}



function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* HOME */}

                <Route
                    path="/"
                    element={<Home />}
                />


                {/* USER */}

                <Route
                    path="/user/login"
                    element={<UserLogin />}
                />

                <Route
                    path="/user/register"
                    element={<UserRegister />}
                />

                            <Route
                path="/user/userdashboard"
                element={<UserDashboard/>}
/>


                {/* OWNER */}

                <Route
                    path="/owner/login"
                    element={<OwnerLogin />}
                />

                <Route
                    path="/owner/register"
                    element={<OwnerRegister />}
                />


                {/* ADMIN */}

                <Route
                    path="/admin/login"
                    element={<AdminLogin />}
                />

            </Routes>

        </BrowserRouter>

    );
}


export default App;