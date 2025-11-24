"use client";

import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/Context/AuthContext";
import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";

const MyListings = () => {
  const { user } = useContext(AuthContext);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchListings = async () => {
    if (!user?.email) return;
    try {
      setLoading(true);
      const res = await fetch(
        `https://pawmart-server-psi.vercel.app/stores?email=${user.email}`
      );
      const data = await res.json();
      setListings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [user?.email]);

  const handleDelete = async (id) => {
    try {
      await fetch(`https://pawmart-server-psi.vercel.app/stores/${id}`, {
        method: "DELETE",
      });

      setListings((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-spinner text-primary text-4xl"></span>
      </div>
    );

  if (!listings.length)
    return (
      <p className="text-center mt-10 text-gray-700 text-lg">
        No listings found!
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto p-5">
      <h2 className="text-4xl text-white font-bold my-12 text-center">
        🐾
        <Typewriter
          words={[" My Listings"]}
          loop={true}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h2>

      {/* Table View (All Devices) */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="table-auto w-full border-collapse text-left">
          <thead className="bg-primary text-white text-sm md:text-base">
            <tr>
              <th className="px-3 py-3">#</th>
              <th className="px-3 py-3">Image</th>
              <th className="px-3 py-3">Name</th>
              <th className="px-3 py-3">Category</th>
              <th className="px-3 py-3">Price</th>
              <th className="px-3 py-3">Location</th>
              <th className="px-3 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {listings.map((listing, index) => (
              <tr
                key={listing._id}
                className={`transition-colors text-white text-sm md:text-base hover:bg-white/20 ${
                  index % 2 === 0 ? "bg-white/5" : "bg-white/10"
                }`}
              >
                <td className="px-3 py-3">{index + 1}</td>

                <td className="px-3 py-3">
                  <img
                    src={listing.image}
                    alt={listing.name}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-md object-cover"

                  />
                </td>

                <td className="px-3 py-3 font-semibold">{listing.name}</td>
                <td className="px-3 py-3">{listing.category}</td>

                <td className="px-3 py-3">
                  {listing.price > 0 ? (
                    <span>৳ {listing.price}</span>
                  ) : (
                    <span className="text-green-500 font-bold">
                      Free Adoption
                    </span>
                  )}
                </td>

                <td className="px-3 py-3">{listing.location}</td>

                <td className="px-3 py-3 text-center">
                  <div className="flex flex-wrap justify-center gap-2">
                    <Link
                      href={`/product-details/${listing._id}`}
                      className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    >
                      Details
                    </Link>

                    <Link
                      href={`/editListing/${listing._id}`}
                      className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(listing._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyListings;
