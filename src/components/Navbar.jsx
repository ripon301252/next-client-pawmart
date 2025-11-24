"use client";

import { useContext, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp, IoLogInOutline } from "react-icons/io5";
import Link from "next/link";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-hot-toast";


const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [avatarDropdown, setAvatarDropdown] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Pets & Supplies", href: "/allpets" },
    ...(user
      ? [
          { name: "My Listing", href: "/mylisting" },
        ]
      : []),
  ];

  const handleSignOut = () => {
    logOut()
      .then(() => toast.success("Sign-out successful"))
      .catch((err) => toast.error(err.message));
    setAvatarDropdown(false);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
          <h1 className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-white">
            Paw<span className="text-orange-500">Mart</span>
          </h1>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-700 dark:text-gray-200 hover:text-[#5633e4] px-3 py-2 rounded-md transition-all"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Theme + Avatar */}
        <div className="hidden md:flex items-center gap-4 relative">
       
          {user ? (
            <div className="relative">
              <img
                src={user.photoURL || "/avatar.png"}
                alt={user.displayName || "User"}
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() => setAvatarDropdown(!avatarDropdown)}
              />
              {avatarDropdown && (
                <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded shadow-lg flex flex-col border border-gray-200 dark:border-gray-700">
                  <Link
                    href="/myprofile"
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-center"
                    onClick={() => setAvatarDropdown(false)}
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-center"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1 bg-gradient-to-r from-[#5633e4] to-[#8755ea] text-white px-3 py-2 rounded-md font-semibold"
            >
              <IoLogInOutline />
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          
          <button onClick={() => setOpen(!open)}>
            {open ? <IoCloseSharp className="w-6 h-6" /> : <GiHamburgerMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg flex flex-col px-4 py-3 gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-2 px-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <>
              <Link
                href="/myprofile"
                className="py-2 px-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                onClick={() => setOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={handleSignOut}
                className="py-2 px-2 bg-gradient-to-r from-[#5633e4] to-[#8755ea] text-white rounded"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/signin"
              className="py-2 px-2 bg-gradient-to-r from-[#5633e4] to-[#8755ea] text-white rounded text-center"
              onClick={() => setOpen(false)}
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
