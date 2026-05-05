import { createContext, useContext, useState, useEffect } from "react";
import axios from "../config/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (formData) => {
    await axios.get("/sanctum/csrf-cookie");
    const res = await axios.post("/auth/login", formData);
    setUser(res.data); // store in state
    return res.data;
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/user");
        setUser(res.data);
      } catch(err) {
        if (err.response?.status === 401) {
          setUser(null);
        } else {
          console.error(err); // this logic don't kill session
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await axios.post("/auth/logout");
      
    } finally {
      setUser(null);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);