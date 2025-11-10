import React, { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

interface AuthContextType {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    // const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("token")); // token exists-user login and token is null-user logout

    const login = (tokenValue: string) => {
        localStorage.setItem("token", tokenValue); // save token in localStorage
        setToken(tokenValue);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        sessionStorage.removeItem("otpUser"); // clear otp session 
    };

    // Auto sync login when refresh
    useEffect(() => {
        const stored = localStorage.getItem("token");
        if (stored) setToken(stored);
    }, []);

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => { // dont repeat code everywhere so i will use useauth
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
    return ctx;
};
