"use client"; // ✅ অবশ্যই প্রথম লাইনে রাখতে হবে

import { useApps } from "../../Hooks/useApps";
import AppCard from "../../Pages/AppCard/AppCard";
import Link from "next/link";

const TrendingApps = () => {
  const { apps, error } = useApps();

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center pt-10">
        <h1 className="text-3xl font-bold mb-3">Something went wrong!</h1>
        <p className="text-gray-500 mb-5">{error.message || "Failed to fetch app data."}</p>
        <Link href="/apps" className="btn btn-primary">
          Back to Apps
        </Link>
      </div>
    );
  }

  const featuredApps = apps.slice(0, 8);

  return (
    <div className="bg-base-200">
      <h1 className="md:text-5xl text-3xl font-bold text-center md:pt-10 pt-5">
        Trending Apps
      </h1>
      <p className="text-sm text-center text-gray-400 md:my-7 my-4 md:mx-0 mx-2">
        Explore All Trending Apps on the Market developed by us
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-5 md:px-10">
        {featuredApps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>

      <div className="text-center my-6">
        <Link
          href="/apps"
          className="btn bg-gradient-to-r from-[#5633e4] to-[#8755ea] text-white"
        >
          Show All
        </Link>
      </div>
    </div>
  );
};

export default TrendingApps;
