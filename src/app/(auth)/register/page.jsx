"use client";

import React, { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { AuthContext } from "@/Context/AuthContext";
import { IoEye, IoEyeOff } from "react-icons/io5";
import toast from "react-hot-toast";

const PageRegister = () => {
  const { createUser, setUser, updateUser, popupGoogleSignin } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    // Name validation
    if (name.length < 5) {
      setNameError("Name should be more than 5 characters");
      toast.error("Name should be more than 5 characters");
      return;
    } else {
      setNameError("");
    }

    // Password validation
    const length6Pattern = /^.{6,}$/;
    const casePattern = /^(?=.*[a-z])(?=.*[A-Z]).+$/;
    if (!length6Pattern.test(password)) {
      setError("Password must be 6 characters or longer");
      toast.error("Password must be 6 characters or longer");
      return;
    } else if (!casePattern.test(password)) {
      setError("Password must have at least one uppercase and one lowercase character");
      toast.error("Password must have at least one uppercase and one lowercase character");
      return;
    }

    try {
      const result = await createUser(email, password);
      const user = result.user;
      form.reset();

      await updateUser({ displayName: name, photoURL: photo });
      setUser({ ...user, displayName: name, photoURL: photo });

      toast.success("Signup Successful");
      router.push("/login");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const res = await popupGoogleSignin();
      setUser(res.user);
      toast.success("Google SignUp Successful");
      router.push("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleTogglePasswordShow = () => setShowPassword(!showPassword);

  return (
    <>
      <Head>
        <title>PawMart - SignUp</title>
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 px-4 py-10">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-white/20">
          <h1 className="text-3xl font-bold text-center text-white mb-4">Create Account</h1>
          <p className="text-center text-white mb-6">
            Join <span className="text-pink-600 font-semibold">PawMart</span> today!
          </p>

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-white font-medium mb-1 block">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full p-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none"
                required
              />
              {nameError && <p className="text-red-500 text-xs mt-1">{nameError}</p>}
            </div>

            {/* Photo */}
            <div>
              <label className="text-white font-medium mb-1 block">Photo URL</label>
              <input
                type="text"
                name="photo"
                placeholder="Your Photo URL"
                className="w-full p-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-white font-medium mb-1 block">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full p-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="text-white font-medium mb-1 block">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full p-3 pr-10 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={handleTogglePasswordShow}
                className="absolute top-10 right-3 text-gray-700 hover:text-pink-500"
              >
                {showPassword ? <IoEyeOff size={22} /> : <IoEye size={22} />}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-semibold hover:scale-105 transition-transform"
            >
              Sign Up
            </button>

            {/* OR Divider */}
            <div className="flex items-center justify-center gap-2 my-4">
              <div className="h-px w-16 bg-gray-300"></div>
              <span className="text-white text-sm">or</span>
              <div className="h-px w-16 bg-gray-300"></div>
            </div>

            {/* Google Signin */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full py-3 flex items-center justify-center gap-2 border border-white/40 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>

            {/* Already have account */}
            <p className="text-center text-white text-sm mt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-pink-600 font-semibold hover:underline">
                Sign In
              </Link>
            </p>

            {/* Error */}
            {error && <p className="text-red-500 text-xs text-center mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default PageRegister;
