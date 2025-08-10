import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        if (!parsedUser.role) {
          console.warn("User object does not contain role!");
          parsedUser.role = "CUSTOMER"; // Hoặc role mặc định bạn muốn
        }

        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }

    setLoading(false);
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const authInfo = {
    user,
    setUser,
    loading,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
