import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setErr("");
        if (!email || !password) return setErr("Please fill all fields.");
        const res = await login({ email, password });
        if (res.success) navigate("/dashboard");
        else setErr(res.message || "Login failed");
    };

    return (
        <div className="auth-page">
            <form className="auth-card" onSubmit={submit}>
                <h2>Login</h2>
                {err && <div className="error">{err}</div>}
                <label>
                    Email
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>

                <label>
                    Password
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>

                <button className="btn" type="submit">Sign in</button>

                <p className="muted">
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </form>
        </div>
    );
}
