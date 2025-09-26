import React, { useState } from "react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    alert("Signing up...\nName: " + name + "\nEmail: " + email);

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
      <div className="max-w-md w-full rounded-3xl bg-black bg-opacity-70 backdrop-blur-xl border border-purple-700 p-8 min-h-[32rem] shadow-lg shadow-purple-800/50">
        <h2 className="text-center text-2xl font-black mb-6 bg-gradient-to-r from-cyan-700 via-purple-700 to-pink-600 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(104,29,148,0.8)] animate-pulse">
          Cosmic Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 font-semibold text-gray-300">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full rounded-xl border border-purple-700 bg-black bg-opacity-30 px-3 py-2 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-pink-600"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 font-semibold text-gray-300">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-xl border border-purple-700 bg-black bg-opacity-30 px-3 py-2 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-pink-600"
              placeholder="example@cosmic.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 font-semibold text-gray-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full rounded-xl border border-purple-700 bg-black bg-opacity-30 px-3 py-2 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-pink-600"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block mb-1 font-semibold text-gray-300">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full rounded-xl border border-purple-700 bg-black bg-opacity-30 px-3 py-2 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-pink-600"
              placeholder=""
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>
          {error && <p className="text-red-400 font-semibold text-center">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-gradient-to-r from-cyan-700 via-purple-700 to-pink-600 font-black text-lg text-white shadow-[0_0_15px_rgba(104,29,148,0.8)] hover:shadow-[0_0_25px_rgba(204,65,122,1)] transition-shadow duration-500"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <a
            href="#"
            className="text-transparent bg-gradient-to-r from-purple-700 via-pink-600 to-cyan-700 bg-clip-text font-bold hover:underline"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}