import { useState } from "react";
import { Josefin_Sans } from "next/font/google"; // Import the font
const josefinSans = Josefin_Sans({ subsets: ["latin"], weight: "400" });

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_SERVER}/notifyMe`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
      }
    );

    if (response.ok) {
      setStatus("Subscribed successfully!");
      setEmail("");
    } else {
      setStatus("Failed to subscribe.");
    }
  };
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-grow text-center my-[40px] mx-auto">
        {/* Logo/Title */}
        <h1
          className={`${josefinSans.className} text-5xl md:text-7xl font-extrabold text-primaryText tracking-tight mb-4 w-[95%] mx-auto`}
        >
          WhiteLabel
        </h1>

        <div className="p-6 mb-8 w-[85%] mx-auto">
          <h2
            className={`${josefinSans.className} text-3xl font-semibold text-primaryText`}
          >
            Something Awesome is Coming Soon
          </h2>
          <p
            className={`${josefinSans.className} mt-2 text-lg text-primaryText`}
          >
            We’re working hard to bring you a brand new experience. Stay tuned
            for updates!
          </p>
        </div>

        {/* Email Signup */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-[85%] mx-auto"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-64 p-3 rounded-md border border-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
          />
          <input
            type="text"
            name="website"
            onChange={(e) => setWebsite(e.target.value)}
            className="hidden"
            tabIndex="-1"
            autoComplete="off"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-accent text-black font-medium rounded-md hover:bg-accentHover transition-colors"
          >
            Notify Me
          </button>
        </form>
        {status && <p className="mt-4 text-center text-gray-600">{status}</p>}
      </main>
    </div>
  );
}
