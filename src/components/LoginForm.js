"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../app/firebase"; // Adjust path if needed

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
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-4 w-full max-w-sm"
    >
      <input
        type="email"
        placeholder="Email"
        className="p-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="p-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
}
