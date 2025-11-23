"use client";

import React, { useState } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import Logo from "../../public/logo.png";
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return toast.error("Please enter your email");
    if (!emailRegex.test(email)) return toast.error("Invalid email address");
    toast.success("Subscribed successfully!");
    setEmail("");
  };

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-5 md:flex md:justify-between md:items-start gap-10">

        {/* Logo & Description */}
        <div className="mb-8 md:mb-0">
          <div className="flex items-center gap-2 mb-2">
            <Image src={Logo} alt="PawMart Logo" width={40} height={40} />
            <h1 className="text-2xl font-bold">
              Paw<span className="text-orange-500">Mart</span>
            </h1>
          </div>
          <p className="max-w-xs">
            PawMart connects local pet owners and buyers for adoption and pet
            care products.
          </p>

          {/* Social Icons */}
          <div className="flex items-center mt-3 gap-3 text-2xl">
            <a
              href="https://www.facebook.com/mahfuzur.rahman.98284"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="hover:text-blue-600 transition-colors"
            >
              <FaFacebook />
            </a>
            <a
              href="https://x.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="X / Twitter"
              className="hover:text-blue-400 transition-colors"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="hover:text-red-600 transition-colors"
            >
              <FaYoutube />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="hover:text-pink-600 transition-colors"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Useful Links */}
        <div className="mb-8 md:mb-0">
          <h3 className="text-xl font-semibold mb-2">Useful Links</h3>
          <ul className="space-y-1">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:underline">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Subscribe */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Subscribe</h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="py-2 px-3 rounded-md outline-none border border-gray-400 dark:border-gray-600 w-full text-gray-800 dark:text-gray-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleSubscribe}
              className="bg-[#5b46b1] hover:bg-[#654dc7] text-white px-4 py-2 rounded-md transition-all duration-300 cursor-pointer"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 border-t border-gray-300 dark:border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} PawMart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
