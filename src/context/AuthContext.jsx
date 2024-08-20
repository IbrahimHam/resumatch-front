import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, [navigate]);

  const isLoggedIn = !!user;

  const login = (newToken, newUserOrRecruiter) => {
    if (!newToken || !newUserOrRecruiter) {
      console.error("Token and user/recruiter are required to login.");
      return;
    }

    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUserOrRecruiter));
    setUser(newUserOrRecruiter);
    setToken(newToken);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isLoggedIn, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
