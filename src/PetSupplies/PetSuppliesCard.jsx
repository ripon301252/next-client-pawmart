"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const PetSuppliesCard = ({ store }) => {
  const router = useRouter();
  const {
    _id,
    image = "",
    name = "",
    category = "",
    price = 0,
    location = "",
    email = "",
  } = store || {};

  // Format price
  const formatPrice = (price) =>
    price > 0
      ? new Intl.NumberFormat("en-BD", {
          style: "currency",
          currency: "BDT",
          maximumFractionDigits: 0,
        }).format(price)
      : "Free for Adoption";

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden flex flex-col cursor-pointer group border border-gray-300 backdrop-blur-lg bg-white/10"
    >
      {/* Image */}
      <div className="overflow-hidden rounded-2xl h-56 sm:h-64 lg:h-60 p-5">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-2xl transition-transform duration-300 transform group-hover:scale-105"
        />
      </div>

      {/* Card Info */}
      <div className="p-6 flex flex-col gap-2 flex-grow">
        <h3 className="text-2xl sm:text-lg font-semibold text-white">{name}</h3>
        <p className="text-sm sm:text-base text-white">
          <span className="font-bold">Category: </span>
          {category}
        </p>
        <p className="text-sm sm:text-base font-medium text-white">
          <span>Price: </span>
          {formatPrice(price)}
        </p>
        <p className="text-sm sm:text-base text-white">
          <span className="font-bold">Location: </span>
          {location}
        </p>
        {email && (
          <p className="text-sm sm:text-base text-white">
            <span className="font-bold">Owner Email: </span>
            {email}
          </p>
        )}

        <button
          onClick={() =>
            router.push(`/${category.toLowerCase().replace(/\s/g, "")}/${_id}`)
          }
          className="mt-4 backdrop-blur-lg bg-white/10 text-white text-base sm:text-lg font-semibold py-3 rounded-lg transition-transform transform hover:scale-105 cursor-pointer"
        >
          See Details
        </button>
      </div>
    </motion.div>
  );
};

export default PetSuppliesCard;
