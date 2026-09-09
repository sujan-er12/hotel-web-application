import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function UserRegister() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const response = await fetch(
            "https://hotel-web-application-bmc5.onrender.com/api/user/register",
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
                navigate("/user/login");
            }, 1000);
        }
    };

    return (
        <div className="auth-container">

            <div className="auth-box">

                <h1>User Registration</h1>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        onChange={handleChange}
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />

                    <button type="submit">
                        Register
                    </button>

                </form>

                <p>{message}</p>

                <p>
                    Already have an account?
                    <Link to="/user/login"> Login</Link>
                </p>

            </div>

        </div>
    );
}

export default UserRegister;