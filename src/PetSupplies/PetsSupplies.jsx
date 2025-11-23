"use client";

import React, { useEffect, useState } from "react";
import PetSuppliesCard from "./PetSuppliesCard";
import {
  FaDog,
  FaDrumstickBite,
  FaBone,
  FaPills,
  FaThLarge,
} from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";

const categories = [
  { name: "All", icon: FaThLarge },
  { name: "Pets", icon: FaDog },
  { name: "Pet Food", icon: FaDrumstickBite },
  { name: "Accessories", icon: FaBone },
  { name: "Pet Care Products", icon: FaPills },
];

const PetsSupplies = () => {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch Stores
  useEffect(() => {
    fetch("https://pawmart-server-psi.vercel.app/stores")
      .then((res) => res.json())
      .then((data) => {
        setStores(data);
        setFilteredStores(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  // Filter data
  useEffect(() => {
    let filtered = stores;

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (store) =>
          store.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchText) {
      filtered = filtered.filter((store) =>
        store.name?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredStores(filtered);
  }, [selectedCategory, searchText, stores]);

  if (loading) {
    return <p className="text-center mt-10 text-white">Loading...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 my-7">
      {/* Typewriter Header */}
      <h2 className="text-4xl text-white font-bold text-center my-12 flex items-center justify-center gap-3">
        🛒
        <Typewriter
          words={["Our Collections", "Pets & Supplies"]}
          loop={true}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h2>

      {/* Category Buttons */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 my-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`flex items-center justify-center sm:justify-start gap-3 px-6 py-3 text-lg sm:text-xl font-semibold transition-all duration-300 shadow-md
              ${
                selectedCategory === cat.name
                  ? "text-white rounded-full shadow-lg scale-105 backdrop-blur-lg bg-white/10 border border-gray-300"
                  : "backdrop-blur-lg bg-white/10 text-white border border-gray-300 rounded-2xl hover:bg-gray-400"
              }`}
            >
              <Icon className="text-2xl" />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Search Bar */}
      <div className="my-10 flex justify-center">
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none backdrop-blur-lg bg-white/10 text-white placeholder-white"
          />

          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white">
            🔍
          </span>
        </div>
      </div>

      {/* Stores Grid */}
      {filteredStores.length > 0 ? (
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
          {filteredStores.map((store) => (
            <PetSuppliesCard key={store._id} store={store} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-300 text-lg">
          No listings found in this category or search.
        </p>
      )}
    </div>
  );
};

export default PetsSupplies;
