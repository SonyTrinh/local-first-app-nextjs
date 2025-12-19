"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useStore } from "@/store/useStore";
import AppHeader from "@/components/app-header";
import FavoriteButton from "@/components/favorite-button";
import Pagination from "@/components/pagination";

const USERS_PER_PAGE = 10;

export default function Home() {
  const { users, currentPage, isLoading, isOffline, fetchUsers, setPage } =
    useStore();

  useEffect(() => {
    fetchUsers(1);
  }, [fetchUsers]);

  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const paginatedUsers = users.slice(startIndex, startIndex + USERS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    if (users.length < newPage * USERS_PER_PAGE) {
      fetchUsers(newPage);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8 text-slate-800">
      <div className="max-w-5xl mx-auto">
        {/* Header & Status Bar */}
        <AppHeader isOffline={isOffline} />

        {/* Loading */}
        {isLoading && paginatedUsers.length === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
            {Array.from({ length: USERS_PER_PAGE }).map((_, i) => (
              <div
                key={i}
                className="flex bg-white rounded-xl p-4 shadow-sm border border-gray-100 animate-pulse"
              >
                <div className="w-16 h-16 rounded-full bg-gray-200" />
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-start">
                    <div className="w-full">
                      <div className="h-6 bg-gray-200 rounded w-1/3 mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* User Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {paginatedUsers.map((user) => (
            <div
              key={user.uuid}
              className="flex bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <Image
                src={user.image}
                alt={user.name}
                width={100}
                height={100}
                loading="lazy"
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
              />
              <div className="ml-4 flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-bold text-lg text-gray-800">
                      {user.name}
                    </h2>
                    <p className="text-sm text-gray-500 break-all">
                      {user.email}
                    </p>
                  </div>
                  <FavoriteButton user={user} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          isLoading={isLoading}
          handlePageChange={handlePageChange}
        />
      </div>
    </main>
  );
}
