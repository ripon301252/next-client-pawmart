"use client"; // Client component

import React, { useEffect, useState, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import { AuthContext } from "../../Context/AuthContext";
import OrderModal from "../MyOrders/OrderModal";

const PageProductDetails = () => {
  const params = useParams();
  const router = useRouter();
  const { id } = params; // URL থেকে id নেওয়া
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`https://pawmart-server-psi.vercel.app/stores/details/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#5633e4] border-solid"></div>
      </div>
    );

  if (!item)
    return (
      <p className="text-center text-xl text-gray-500 mt-20">
        Item not found 😿
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8">
      <title>PawMart - Product Details</title>

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center text-white font-medium transition cursor-pointer"
      >
        ← Back to Previous Page
      </button>

      {/* Main Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start backdrop-blur-lg bg-white/10 shadow-lg rounded-2xl overflow-hidden p-4 sm:p-6">
        {/* Image */}
        <div className="relative rounded-xl overflow-hidden group">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-[350px] sm:h-[450px] object-cover rounded-xl transition-transform duration-300 transform group-hover:scale-105 group-hover:shadow-xl"
          />
          <span className="absolute top-4 right-4 bg-[#765ed4] text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
            {item.category}
          </span>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between p-4 sm:p-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              {item.name}
            </h1>

            <p className="text-white text-lg mb-3">
              <strong>💰 Price:</strong>{" "}
              {item.price > 0 ? (
                <span className="text-white font-semibold">৳ {item.price}</span>
              ) : (
                <span className="text-green-600 font-semibold">
                  Free for Adoption 🐾
                </span>
              )}
            </p>

            <div className="space-y-2 text-white text-base mb-4">
              <p>
                <strong>📍 Location:</strong> {item.location}
              </p>
              <p>
                <strong>📧 Owner Email:</strong> {item.email || "Not Provided"}
              </p>
              {item.ownerName && (
                <p>
                  <strong>👤 Owner Name:</strong> {item.ownerName}
                </p>
              )}
              {item.date && (
                <p>
                  <strong>📅 Pick Up Date:</strong> {item.date}
                </p>
              )}
              {item.postedAt && (
                <p>
                  <strong>🕒 Posted On:</strong>{" "}
                  {new Date(item.postedAt).toLocaleDateString()}
                </p>
              )}
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2 text-white">
                Description
              </h2>
              <p className="text-white leading-relaxed text-justify">
                {item.description || "No description available."}
              </p>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={() => setModalOpen(true)}
            className="mt-6 w-full sm:w-auto backdrop-blur-lg bg-white/10 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:scale-105 transition-transform cursor-pointer"
          >
            🛒 Adopt / Order Now
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <OrderModal
          item={item}
          userEmail={user?.email}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default PageProductDetails;
