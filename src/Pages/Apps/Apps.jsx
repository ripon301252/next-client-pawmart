"use client";

import React, { useEffect, useState } from "react";
import { useApps } from "../../Hooks/useApps";
import AppAllCard from "../AppCard copy/AppCard";
import { IoSearch } from "react-icons/io5";

const Apps = () => {
  const { apps, loading, error } = useApps();

  const [loadingDelay, setLoadingDelay] = useState(true);
  const [search, setSearch] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  const term = search.trim().toLowerCase();
  const searchedApps = term
    ? apps.filter((app) =>
        app.companyName.toLowerCase().includes(term)
      )
    : apps;

  // Initial page load delay
  useEffect(() => {
    const timer = setTimeout(() => setLoadingDelay(false), 100);
    return () => clearTimeout(timer);
  }, []);

  // Search loading effect
  useEffect(() => {
    if (!term) {
      setSearchLoading(false);
      return;
    }

    setSearchLoading(true);
    const timer = setTimeout(() => setSearchLoading(false), 300);
    return () => clearTimeout(timer);
  }, [term]);

  const isLoading = loading || loadingDelay;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center pt-10">
        <h1 className="text-3xl font-bold mb-3">Something went wrong!</h1>
        <p className="text-gray-500 mb-5">
          {error.message || "Failed to fetch app data."}
        </p>
        <a href="/apps" className="btn btn-primary">
          Back to Apps
        </a>
      </div>
    );
  }

  return (
    <div className="bg-base-200">
      <title>Easy Apps - Apps</title>
      <h1 className="text-center md:text-4xl text-2xl font-semibold md:pt-10 pt-5 pb-5">
        Our All Applications
      </h1>
      <p className="text-center text-sm text-gray-400 md:mb-0 mb-4 mx-5">
        Explore All Apps on the Market developed by us. We code for Millions
      </p>
      <div className="px-10 flex md:flex-row flex-col justify-between items-center">
        <div className="flex items-center gap-1">
          <p className="text-xl font-semibold">({searchedApps.length})</p>
          <h3 className="text-xl font-semibold">Apps Found</h3>
        </div>
        <label className="input mt-5 mb-3">
          <IoSearch className="text-gray-400 text-xl" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            placeholder=" Search Product"
            className="-ml-2"
          />
        </label>
      </div>

      {searchLoading ? (
        <div className="flex justify-center items-center h-40">
          <span className="loading loading-infinity loading-xl"></span>
        </div>
      ) : searchedApps.length === 0 ? (
        <p className="flex flex-col items-center justify-center md:text-5xl text-xl font-bold md:py-32 py-10">
          No Apps Found
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-5 md:px-10">
          {searchedApps.map((app) => (
            <AppAllCard key={app.id} app={app} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Apps;
