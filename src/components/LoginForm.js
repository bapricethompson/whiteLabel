"use client";

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../app/firebase"; // Adjust path if needed
import Link from "next/link";
import { parseCookies } from "nookies";

const checkAuthStatus = async () => {
  try {
    const serverURL = process.env.NEXT_PUBLIC_REACT_APP_SERVER;
    const cookies = parseCookies(); // Make sure you have imported parseCookies
    const token = cookies.token; // Get the token from cookies

    if (!token) {
      return; // Stay on current page if no token exists
    }

    const response = await fetch(`${serverURL}/users/self`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      // If user is authenticated, redirect to home
      window.location.replace("/");
    } else {
      // If response is not ok, clear the invalid token
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  } catch (error) {
    console.error("Error checking auth status:", error);
    // Optionally clear token on error
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
};

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCred.user.getIdToken();

      // Optionally store it for future requests
      document.cookie = `token=${idToken};`; // Adjust the cookie settings as needed
      window.location.replace("/");
      console.log("Token set in cookie");

      console.log("Logged in!", userCred.user);
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Check your credentials.");
    }

    setLoading(false);
  };

  return (
    <div className="w-[80%] mx-auto py-12">
      <h1 className="text-center text-4xl pb-4">Login</h1>
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 w-[90%] mx-auto max-w-sm"
      >
        <div className="mb-4 ">
          <label htmlFor="email" className="block mb-1 font-semibold">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="p-2 border rounded w-full text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4 ">
          <label htmlFor="password" className="block mb-1 font-semibold">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="p-2 border rounded w-full text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-accent text-black py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <Link href="/signUp" className="text-center block underline cursor">
          Create An Account
        </Link>
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
}
