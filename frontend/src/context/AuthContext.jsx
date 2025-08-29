import React, { createContext, useState, useEffect } from "react";
import api from "../utils/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const raw = localStorage.getItem("user");
        return raw ? JSON.parse(raw) : null;
    });
    const [token, setToken] = useState(() => localStorage.getItem("token") || null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        else delete api.defaults.headers.common["Authorization"];
    }, [token]);

    const login = async (credentials) => {
        setLoading(true);
        try {
            const { data } = await api.post("/users/login", credentials);
            // backend returns { id, username, email, token }
            setUser(data);
            setToken(data.token);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data));
            return { success: true };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || err.message };
        } finally {
            setLoading(false);
        }
    };

    const register = async (payload) => {
        setLoading(true);
        try {
            const { data } = await api.post("/users/register", payload);
            setUser(data);
            setToken(data.token);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data));
            return { success: true };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || err.message };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        delete api.defaults.headers.common["Authorization"];
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
