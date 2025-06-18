"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../app/firebase"; // Adjust path if needed
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCred.user.getIdToken();

      // Optionally store it for future requests
      localStorage.setItem("token", idToken);

      console.log("Logged in!", userCred.user);
      // maybe redirect or update UI state here
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
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-semibold">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="p-2 border rounded w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 font-semibold">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="p-2 border rounded w-full"
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
