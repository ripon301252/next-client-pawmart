"use client";

import React, { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/Context/AuthContext";
import { IoEye, IoEyeOff } from "react-icons/io5";
import toast from "react-hot-toast";

const PageLogin = () => {
  const { signIn, popupGoogleSignin, setUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSignin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setError("");

    try {
      await signIn(email, password);
      form.reset();
      toast.success("Signin Successful");
      router.push("/");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      const res = await popupGoogleSignin();
      setUser(res.user);
      toast.success("Google Signin successful");
      router.push("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleTogglePasswordShow = () => setShowPassword(!showPassword);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-white/20">
        <h1 className="text-3xl font-bold text-center text-white mb-6">Welcome Back</h1>

        <form onSubmit={handleSignin} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-white mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div className="relative">
            <label className="text-sm font-medium text-white mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              required
              className="w-full pr-10 px-4 py-2 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button
              type="button"
              onClick={handleTogglePasswordShow}
              className="absolute top-11 right-3 -translate-y-1/2 text-gray-700 hover:text-pink-500"
            >
              {showPassword ? <IoEyeOff size={22} /> : <IoEye size={22} />}
            </button>
          </div>

          <div className="text-right">
            <Link href="/forgotpassword" className="text-pink-600 text-sm hover:underline font-medium">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform"
          >
            Sign In
          </button>

          <div className="flex items-center justify-center gap-2 my-3">
            <div className="h-px w-16 bg-gray-300"></div>
            <span className="text-white text-sm">or</span>
            <div className="h-px w-16 bg-gray-300"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignin}
            className="w-full flex items-center justify-center gap-3 py-3 border border-white/40 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="google" className="w-5 h-5" />
            Continue with Google
          </button>

          <p className="text-center text-white text-sm mt-4">
            Don't have an account?{" "}
            <Link href="/register" className="text-pink-600 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>

          {error && <p className="text-red-500 text-xs text-center font-semibold mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default PageLogin;
