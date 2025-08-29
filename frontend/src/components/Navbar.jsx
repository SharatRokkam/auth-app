import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    // theme (light/dark)
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="nav">
            <div className="nav-inner">
                <Link to="/" className="brand">
                    My<span className="accent">App</span>
                </Link>

                <button className={`burger ${open ? "open" : ""}`} onClick={() => setOpen((s) => !s)} aria-label="Toggle nav">
                    <span />
                    <span />
                    <span />
                </button>

                <div className={`nav-links ${open ? "open" : ""}`}>
                    <Link to="/" onClick={() => setOpen(false)}>Home</Link>
                    <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>

                    {!user ? (
                        <>
                            <Link to="/login" className="nav-cta" onClick={() => setOpen(false)}>Login</Link>
                            <Link to="/register" className="btn" onClick={() => setOpen(false)}>Register</Link>
                        </>
                    ) : (
                        <>
                            <span className="username">Hi, {user.username}</span>
                            <button className="btn outline" onClick={handleLogout}>Logout</button>
                        </>
                    )}

                    <button
                        className="theme-toggle"
                        onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
                        title="Toggle theme"
                    >
                        {theme === "light" ? "🌙" : "☀️"}
                    </button>
                </div>
            </div>
        </nav>
    );
}
