"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../app/firebase"; // adjust path
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import nookies from "nookies";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        setUser(firebaseUser);
        nookies.set(undefined, "token", token, {
          path: "/",
          maxAge: 60 * 60 * 24, // 1 day
          httpOnly: false,
        });
      } else {
        setUser(null);
        nookies.destroy(undefined, "token");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    await firebaseSignOut(auth);
    nookies.destroy(undefined, "token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
