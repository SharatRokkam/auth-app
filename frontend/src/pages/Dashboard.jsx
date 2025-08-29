import React, { useEffect, useState, useContext } from "react";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import Card from "../components/Card";

export default function Dashboard() {
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        let mounted = true;
        const fetchProfile = async () => {
            try {
                const { data } = await api.get("/users/me");
                if (mounted) setProfile(data);
            } catch (err) {
                console.error("Profile fetch failed:", err);
            }
        };
        fetchProfile();
        return () => (mounted = false);
    }, []);

    return (
        <section className="dashboard">
            <h2>Welcome{user ? `, ${user.username}` : ""}</h2>

            <div className="grid">
                <Card title="Profile" text={profile ? `Email: ${profile.email}` : "Loading..."} />
                <Card title="Quick Action" text="You can add actions, API calls, charts, etc." />
                <Card title="Notes" text="This is a place to show user-specific data." />
            </div>
        </section>
    );
}
