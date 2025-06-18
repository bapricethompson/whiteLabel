"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_SERVER}/users`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            password,
            permissions: [], // Or ["User"] if you want to assign a default role
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Signup failed.");

      setSuccess("Signup successful! You can now log in.");
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="w-[80%] mx-auto py-12">
      <h1 className="text-center text-4xl pb-4">Sign Up</h1>
      <form
        onSubmit={handleSignUp}
        className="flex flex-col gap-4 w-[90%] mx-auto max-w-sm"
      >
        <div>
          <label htmlFor="name" className="block mb-1 font-semibold">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Full Name"
            className="p-2 border rounded w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
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

        <div>
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
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        <Link href="/login" className="text-center block underline cursor">
          Have an account?
        </Link>

        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}
      </form>
    </div>
  );
}
