import React from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <section className="home">
            <header className="hero">
                <div className="hero-left">
                    <h1>Beautiful, responsive React frontend — ready for your backend</h1>
                    <p>Vite + React + clean CSS variables. Auth flow, protected routes and API wrapper included.</p>
                    <div className="hero-actions">
                        <Link to="/register" className="btn">Get started</Link>
                        <Link to="/dashboard" className="btn outline">Try Dashboard</Link>
                    </div>
                </div>
                <div className="hero-right">
                    <div className="mock">
                        <div className="mock-top" />
                        <div className="mock-content">
                            <h4>UI Preview</h4>
                            <p>Cards, responsive layout, and forms.</p>
                        </div>
                    </div>
                </div>
            </header>

            <section className="features">
                <Card title="Responsive" text="Looks great on mobile, tablet and desktop." />
                <Card title="Auth-ready" text="Login / Register + protected routes example." />
                <Card title="Modern" text="Vite, React Router and Axios with an API wrapper." />
                <Card title="Theming" text="Light & dark theme toggle included." />
            </section>
        </section>
    );
}
