import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Check if user is already logged in on mount
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            // Call backend API
            const response = await fetch("https://hrms-lite-6hbt.onrender.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                return { success: false, error: "Invalid username or password" };
            }

            const data = await response.json();

            // Store token and admin info
            localStorage.setItem("authToken", data.access_token);
            localStorage.setItem("adminName", data.admin_name);

            setIsAuthenticated(true);
            navigate("/");
            return { success: true };
        } catch (error) {
            console.error("Login error:", error);
            return { success: false, error: "Failed to connect to server" };
        }
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        setIsAuthenticated(false);
        navigate("/login");
    };

    const value = {
        isAuthenticated,
        login,
        logout,
        loading,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
