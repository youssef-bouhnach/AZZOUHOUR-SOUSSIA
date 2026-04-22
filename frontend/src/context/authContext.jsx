import { createContext, useContext, useState, useEffect } from "react";
import axios from "../lib/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user on app load — if session cookie is valid, returns user
  useEffect(() => {
    axios.get("/api/user")
      .then(res => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (formData) => {
    await axios.get("/sanctum/csrf-cookie");
    const res = await axios.post("/auth/login", formData);
    setUser(res.data.user); // 👈 store in state
  };

  const logout = async () => {
    await axios.post("/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);