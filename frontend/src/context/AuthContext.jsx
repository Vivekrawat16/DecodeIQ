import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/auth/me", {
          // ensure credentials are sent
          credentials: "include",
        });
        
        if (res.ok) {
          const data = await res.json();
          setAuthUser(data);
        } else {
          setAuthUser(null);
        }
      } catch (error) {
        console.error("Error checking auth:", error);
        setAuthUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
