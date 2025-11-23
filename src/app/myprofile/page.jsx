"use client";

import { AuthContext } from "@/Context/AuthContext";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

const PageMyProfile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

  const handleUpdate = (e) => {
    e.preventDefault();

    updateUser({ displayName: name, photoURL })
      .then(() => {
        toast.success("Profile updated!");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex justify-center items-center px-4 py-8">

      <div className="card w-full max-w-md backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/30">
        <h1 className="text-3xl font-bold text-center mb-2 text-white">
          My Profile
        </h1>

        <p className="text-center text-white mb-6">
          Manage your{" "}
          <span className="font-medium">
            <span className="text-black">Paw</span>
            <span className="text-[#5633e4]">Mart</span>
          </span>{" "}
          account
        </p>

        {/* Profile Info */}
        <div className="text-center mb-6">
          {photoURL ? (
            <img
              src={photoURL}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto shadow-lg object-cover border border-white/40"
            />
          ) : (
            <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 flex items-center justify-center text-4xl text-gray-600 shadow-inner">
              👤
            </div>
          )}

          <p className="text-white font-semibold mt-2">
            {name || "No Name Set"}
          </p>

          <p className="text-sm text-white opacity-80">{user?.email}</p>
        </div>

        {/* Update Form */}
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="text-white font-semibold">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="input input-bordered w-full bg-white text-black"
              required
            />
          </div>

          <div>
            <label className="text-white font-semibold">Photo URL</label>
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="Enter photo URL"
              className="input input-bordered w-full bg-white text-black"
              required
            />
          </div>

          <button
            type="submit"
            className="btn w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:opacity-90 border-none"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default PageMyProfile;
