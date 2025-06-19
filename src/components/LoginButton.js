"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app, auth } from "../../firebase";

export default function LoginButton({ children, type, onClick, href }) {
  const [clicked, setClicked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const router = useRouter();
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    });
    return () => unsubscribe();
  }, [auth]);

  const handleClick = async () => {
    if (onClick) onClick();
    if (isLoggedIn) {
      try {
        await signOut(auth);
        setIsLoggedIn(false);
        router.push("/"); // optional: redirect to homepage after logout
      } catch (error) {
        console.error("Logout failed:", error);
      }
    } else if (href) {
      router.push(href); // redirect to login
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`px-7 py-3 hidden md:block w-fit rounded-[10px] m-auto cursor-pointer border-2 border-steel ${
        clicked ? "bg-red-500" : "bg-background hover:bg-neutral-100"
      }`}
    >
      {isLoggedIn ? "Logout" : children || "Login"}
    </div>
  );
}
