"use client";

import { useRef, useContext } from "react";
import { AuthContext } from "@/Context/AuthContext";
import toast from "react-hot-toast";
import { useSearchParams, useRouter } from "next/navigation";

const PageResetPassword = () => {
  const { passwordReset } = useContext(AuthContext);
  const emailRef = useRef();
  const searchParams = useSearchParams();
  const router = useRouter();

  const prefilledEmail = searchParams.get("email") || "";

  const handleReset = () => {
    const email = emailRef.current.value;
    if (!email) return toast.error("Please enter your email");

    passwordReset(email)
      .then(() => {
        toast.success("Password reset email sent! Check your Gmail.");
        router.push("/login");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 px-4">
      <title>PawMart - Reset Password</title>

      <div className="card w-full max-w-md backdrop-blur-lg bg-white/10 shadow-2xl border border-white/40 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          Reset Your Password
        </h2>
        <p className="text-white text-sm mb-6">
          Enter your email address below and we’ll send you a password reset
          link.
        </p>

        <input
          ref={emailRef}
          defaultValue={prefilledEmail}
          type="email"
          placeholder="Enter your email"
          className="input input-bordered w-full mb-5 bg-white text-black placeholder-gray-500 focus:outline-none p-2 rounded-md"
          required
        />

        <button
          onClick={handleReset}
          className="btn btn-primary w-full bg-gradient-to-r from-pink-500 to-purple-500 border-none text-white p-2 rounded-md"
        >
          Send Reset Link
        </button>

        <div className="mt-6 text-sm text-white">
          <p>
            Remembered your password?{" "}
            <button
              onClick={() => router.push("/login")}
              className="text-pink-600 hover:underline font-semibold cursor-pointer"
            >
              Back to Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageResetPassword;
