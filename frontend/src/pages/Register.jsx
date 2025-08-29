import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setErr("");
        if (!username || !email || !password) return setErr("Please fill all fields.");
        const res = await register({ username, email, password });
        if (res.success) navigate("/dashboard");
        else setErr(res.message || "Register failed");
    };

    return (
        <div className="auth-page">
            <form className="auth-card" onSubmit={submit}>
                <h2>Create account</h2>
                {err && <div className="error">{err}</div>}
                <label>
                    Username
                    <input value={username} onChange={(e) => setUsername(e.target.value)} required />
                </label>

                <label>
                    Email
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>

                <label>
                    Password
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>

                <button className="btn" type="submit">Register</button>
                <p className="muted">Already registered? <Link to="/login">Login</Link></p>
            </form>
        </div>
    );
}
