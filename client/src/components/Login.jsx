import React, { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    alert("Logging in with\nEmail: " + email + "\nPassword: " + password);

  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: `
          radial-gradient(circle at top left, rgba(104,29,148,0.35) 0%, transparent 40%),
          radial-gradient(circle at bottom right, rgba(0,212,255,0.35) 0%, transparent 40%),
          linear-gradient(135deg, #0a0a1a 0%, #000000 100%)
        `,
      }}
    >
      <div className="max-w-md w-full rounded-3xl bg-black bg-opacity-70 backdrop-blur-xl border border-purple-700 p-16 min-h-[32rem] shadow-lg shadow-purple-800/50">
        <h2 className="text-center text-3xl font-black mb-8 bg-gradient-to-r from-purple-700 via-pink-600 to-cyan-700 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(104,29,148,0.8)] animate-pulse">
          Cosmic Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 font-semibold text-gray-300"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-xl border border-purple-700 bg-black bg-opacity-30 px-4 py-3 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-pink-600"
              placeholder="example@cosmic.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 font-semibold text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full rounded-xl border border-purple-700 bg-black bg-opacity-30 px-4 py-3 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-pink-600"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
          {error && (
            <p className="text-red-400 font-semibold text-center">{error}</p>
          )}
          <button
            type="submit"
            className="w-full py-4 rounded-full bg-gradient-to-r from-purple-700 via-pink-600 to-cyan-700 font-black text-xl text-white shadow-[0_0_20px_rgba(104,29,148,0.8)] hover:shadow-[0_0_35px_rgba(204,65,122,1)] transition-shadow duration-500"
          >
            Sign In
          </button>
        </form>
        <p className="mt-8 text-center text-gray-400">
          Don't have an account?{" "}
          <a
            href="#"
            className="text-transparent bg-gradient-to-r from-cyan-700 via-purple-700 to-pink-600 bg-clip-text font-bold hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}