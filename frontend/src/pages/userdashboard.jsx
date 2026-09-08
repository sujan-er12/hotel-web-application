import { useState } from "react";
import "./userdashboard.css";

function UserDashboard() {

    // Safely get user data from localStorage
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;

    // Filter states
    const [roomType, setRoomType] = useState("All");
    const [acType, setAcType] = useState("All");

    // Booking states
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [rooms, setRooms] = useState(1);
    const [nights, setNights] = useState(1);


    // Room Data
    const roomData = [
        {
            id: 1,
            name: "Standard Room",
            type: "Standard",
            ac: "AC",
            price: 1800,
            image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80",
            description: "Comfortable room suitable for 1-2 guests.",
            facilities: ["Free WiFi", "TV", "Breakfast"]
        },
        {
            id: 2,
            name: "Standard Room",
            type: "Standard",
            ac: "Non-AC",
            price: 1200,
            image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
            description: "Affordable and comfortable non-AC room.",
            facilities: ["Free WiFi", "TV", "Room Service"]
        },
        {
            id: 3,
            name: "Deluxe Room",
            type: "Deluxe",
            ac: "AC",
            price: 2800,
            image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
            description: "Spacious AC room with premium facilities.",
            facilities: ["Free WiFi", "TV", "Breakfast", "Mini Bar"]
        },
        {
            id: 4,
            name: "Deluxe Room",
            type: "Deluxe",
            ac: "Non-AC",
            price: 2000,
            image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
            description: "Large and comfortable room for families.",
            facilities: ["Free WiFi", "TV", "Room Service"]
        },
        {
            id: 5,
            name: "Executive Suite",
            type: "Suite",
            ac: "AC",
            price: 4500,
            image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80",
            description: "Luxury suite with separate living space.",
            facilities: [
                "Free WiFi",
                "Breakfast",
                "Mini Bar",
                "King Bed"
            ]
        },
        {
            id: 6,
            name: "Family Room",
            type: "Family",
            ac: "AC",
            price: 3500,
            image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
            description: "Large room designed for families.",
            facilities: [
                "Free WiFi",
                "Breakfast",
                "2 Beds",
                "TV"
            ]
        }
    ];


    // Filter rooms
    const filteredRooms = roomData.filter((room) => {

        const typeMatch =
            roomType === "All" ||
            room.type === roomType;

        const acMatch =
            acType === "All" ||
            room.ac === acType;

        return typeMatch && acMatch;
    });


    // Open booking modal
    const openBooking = (room) => {

        setSelectedRoom(room);
        setRooms(1);
        setNights(1);
    };


    // Calculate total price
    const totalPrice = selectedRoom
        ? selectedRoom.price * rooms * nights
        : 0;


    // Confirm booking
    const confirmBooking = () => {

        if (!selectedRoom) return;

        alert(
            `Booking Confirmed!\n\n` +
            `Room: ${selectedRoom.name}\n` +
            `Type: ${selectedRoom.ac}\n` +
            `Rooms: ${rooms}\n` +
            `Nights: ${nights}\n` +
            `Total: ₹${totalPrice.toLocaleString()}`
        );

        setSelectedRoom(null);
    };


    // Logout
    const logout = () => {

        localStorage.removeItem("user");

        window.location.href = "/user/login";
    };


    return (

        <div className="dashboard">

            {/* NAVBAR */}

            <nav className="dashboard-navbar">

                <div className="hotel-logo">
                    <span>✦</span>
                    StayVista
                </div>


                <div className="nav-user">

                    <div className="user-info">

                        <span>Welcome</span>

                        <strong>
                            {user?.name || "Guest"}
                        </strong>

                    </div>


                    <button
                        onClick={logout}
                        className="logout-btn"
                    >
                        Logout
                    </button>

                </div>

            </nav>



            {/* HERO SECTION */}

            <section className="dashboard-hero">

                <div className="hero-content">

                    <p>STAYVISTA HOTELS</p>

                    <h1>
                        Find your perfect
                        <span> stay</span>
                    </h1>

                    <h3>
                        Comfortable rooms. Great prices.
                        <br />
                        Unforgettable experiences.
                    </h3>

                </div>

            </section>



            {/* BOOKING SECTION */}

            <section className="booking-section">

                <div className="section-heading">

                    <div>

                        <p>OUR ROOMS</p>

                        <h2>
                            Choose your room
                        </h2>

                    </div>


                    <span>
                        {filteredRooms.length} rooms available
                    </span>

                </div>



                {/* FILTERS */}

                <div className="filters">


                    {/* ROOM TYPE */}

                    <div className="filter-group">

                        <label>Room Type</label>

                        <select
                            value={roomType}
                            onChange={(e) =>
                                setRoomType(e.target.value)
                            }
                        >

                            <option value="All">
                                All Rooms
                            </option>

                            <option value="Standard">
                                Standard
                            </option>

                            <option value="Deluxe">
                                Deluxe
                            </option>

                            <option value="Suite">
                                Suite
                            </option>

                            <option value="Family">
                                Family
                            </option>

                        </select>

                    </div>



                    {/* AC TYPE */}

                    <div className="filter-group">

                        <label>Room Category</label>

                        <div className="ac-buttons">

                            <button
                                className={
                                    acType === "All"
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    setAcType("All")
                                }
                            >
                                All
                            </button>


                            <button
                                className={
                                    acType === "AC"
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    setAcType("AC")
                                }
                            >
                                ❄ AC
                            </button>


                            <button
                                className={
                                    acType === "Non-AC"
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    setAcType("Non-AC")
                                }
                            >
                                ☀ Non-AC
                            </button>

                        </div>

                    </div>

                </div>



                {/* ROOM GRID */}

                <div className="room-grid">

                    {filteredRooms.map((room) => (

                        <div
                            className="room-card"
                            key={room.id}
                        >

                            <div className="room-image">

                                <img
                                    src={room.image}
                                    alt={room.name}
                                />

                                <span className="room-badge">
                                    {room.ac}
                                </span>

                            </div>



                            <div className="room-content">

                                <div className="room-title">

                                    <div>

                                        <h3>
                                            {room.name}
                                        </h3>

                                        <span>
                                            {room.type} Room
                                        </span>

                                    </div>


                                    <div className="room-price">

                                        <strong>
                                            ₹{room.price.toLocaleString()}
                                        </strong>

                                        <small>
                                            / night
                                        </small>

                                    </div>

                                </div>



                                <p className="room-description">
                                    {room.description}
                                </p>



                                <div className="facilities">

                                    {room.facilities.map(
                                        (facility, index) => (

                                            <span key={index}>
                                                ✓ {facility}
                                            </span>

                                        )
                                    )}

                                </div>



                                <button
                                    className="book-button"
                                    onClick={() =>
                                        openBooking(room)
                                    }
                                >
                                    Book Now
                                    <span>→</span>
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </section>



            {/* BOOKING MODAL */}

            {selectedRoom && (

                <div className="modal-overlay">

                    <div className="booking-modal">


                        {/* CLOSE BUTTON */}

                        <button
                            className="close-modal"
                            onClick={() =>
                                setSelectedRoom(null)
                            }
                        >
                            ×
                        </button>


                        <h2>
                            Book Your Room
                        </h2>


                        <p className="modal-room">

                            {selectedRoom.name} ·{" "}
                            {selectedRoom.ac}

                        </p>



                        {/* SELECTED ROOM */}

                        <div className="selected-room">

                            <img
                                src={selectedRoom.image}
                                alt={selectedRoom.name}
                            />


                            <div>

                                <h3>
                                    {selectedRoom.name}
                                </h3>

                                <p>
                                    ₹
                                    {selectedRoom.price.toLocaleString()}
                                    {" "}per night
                                </p>

                            </div>

                        </div>



                        {/* BOOKING INPUTS */}

                        <div className="booking-inputs">


                            {/* NUMBER OF ROOMS */}

                            <div>

                                <label>
                                    Number of Rooms
                                </label>


                                <select
                                    value={rooms}
                                    onChange={(e) =>
                                        setRooms(
                                            Number(e.target.value)
                                        )
                                    }
                                >

                                    <option value="1">
                                        1 Room
                                    </option>

                                    <option value="2">
                                        2 Rooms
                                    </option>

                                    <option value="3">
                                        3 Rooms
                                    </option>

                                    <option value="4">
                                        4 Rooms
                                    </option>

                                </select>

                            </div>



                            {/* NUMBER OF NIGHTS */}

                            <div>

                                <label>
                                    Number of Nights
                                </label>


                                <select
                                    value={nights}
                                    onChange={(e) =>
                                        setNights(
                                            Number(e.target.value)
                                        )
                                    }
                                >

                                    <option value="1">
                                        1 Night
                                    </option>

                                    <option value="2">
                                        2 Nights
                                    </option>

                                    <option value="3">
                                        3 Nights
                                    </option>

                                    <option value="4">
                                        4 Nights
                                    </option>

                                    <option value="5">
                                        5 Nights
                                    </option>

                                    <option value="7">
                                        7 Nights
                                    </option>

                                </select>

                            </div>

                        </div>



                        {/* PRICE SUMMARY */}

                        <div className="price-summary">

                            <span>

                                ₹{selectedRoom.price.toLocaleString()}
                                {" "}× {rooms} room
                                {rooms > 1 ? "s" : ""}
                                {" "}× {nights} night
                                {nights > 1 ? "s" : ""}

                            </span>


                            <strong>
                                ₹{totalPrice.toLocaleString()}
                            </strong>

                        </div>



                        {/* CONFIRM BUTTON */}

                        <button
                            className="confirm-button"
                            onClick={confirmBooking}
                        >
                            Confirm Booking
                            <span>→</span>
                        </button>

                    </div>

                </div>

            )}

        </div>
    );
}

export default UserDashboard;