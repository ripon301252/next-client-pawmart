"use client"; // Client component

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaDog, FaDrumstickBite, FaBone, FaPills } from "react-icons/fa";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

const RecentList = () => {
  const router = useRouter();
  const [stores, setStores] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Pets");

  const categories = [
    { name: "Pets", icon: <FaDog /> },
    { name: "Pet Food", icon: <FaDrumstickBite /> },
    { name: "Accessories", icon: <FaBone /> },
    { name: "Pet Care Products", icon: <FaPills /> },
  ];

  // Fetch stores by selected category
  useEffect(() => {
    fetch(
      `https://pawmart-server-psi.vercel.app/stores-list?category=${encodeURIComponent(
        selectedCategory
      )}`
    )
      .then((res) => res.json())
      .then((data) => setStores(data))
      .catch((err) => console.log(err));
  }, [selectedCategory]);

  // Framer Motion Variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05 },
  };

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
    <div className="p-4 sm:p-8">
      <h1 className="text-center text-4xl text-white font-bold mt-14 mb-8 flex items-center justify-center gap-3">
        🐾
        <Typewriter
          words={["Home", "Recent List"]}
          loop={true}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h1>

      {/* Category Buttons */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 my-10">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={`flex items-center justify-center sm:justify-start gap-3 px-6 py-5 text-lg sm:text-xl font-semibold transition-all duration-300 cursor-pointer shadow ${
              selectedCategory === cat.name
                ? "text-white rounded-full border-gray-300 shadow-lg scale-105 backdrop-blur-lg bg-white/10"
                : "backdrop-blur-lg bg-white/10 text-white border border-gray-300 rounded-2xl hover:bg-gray-400"
            }`}
          >
            <span className="text-2xl">{cat.icon}</span>
            <span className="hidden sm:inline">{cat.name}</span>
            <span className="sm:hidden">{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {stores.slice(0, 6).map((item) => (
          <motion.div
            key={item._id}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            transition={{ duration: 0.3 }}
            className="rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden flex flex-col cursor-pointer group border border-gray-300 backdrop-blur-lg bg-white/10"
          >
            {/* Image */}
            <div className="overflow-hidden rounded-2xl h-56 sm:h-64 lg:h-60 p-5">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover rounded-2xl transition-transform duration-300 transform group-hover:scale-105"
              />
            </div>

            {/* Card Info */}
            <div className="p-6 flex flex-col gap-2 flex-grow">
              <h3 className="text-2xl sm:text-lg font-semibold text-white">
                {item.name}
              </h3>
              <p className="text-sm sm:text-base text-white">
                <span className="font-bold">Category: </span>
                {item.category}
              </p>
              <p className="text-sm sm:text-base font-medium text-white">
                <span>Price: </span>
                {formatPrice(item.price)}
              </p>
              <p className="text-sm sm:text-base text-white">
                <span className="font-bold">Location: </span>
                {item.location}
              </p>
              {item.email && (
                <p className="text-sm sm:text-base text-white">
                  <span className="font-bold">Owner Email: </span>
                  {item.email}
                </p>
              )}

              <button
                onClick={() =>
                  router.push(
                    `/${selectedCategory.toLowerCase().replace(/\s/g, "")}/${
                      item._id
                    }`
                  )
                }
                className="mt-4 backdrop-blur-lg bg-white/10 text-white text-base sm:text-lg font-semibold py-3 rounded-lg transition-transform transform hover:scale-105 cursor-pointer"
                aria-label={`See details of ${item.name}`}
              >
                See Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentList;
