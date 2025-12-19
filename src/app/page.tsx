"use client";

import { useEffect, useMemo } from "react";
import { useStore } from "@/store/useStore";
import Image from "next/image";
import AppHeader from "@/components/app-header";
import FavoriteButton from "@/components/favorite-button";
import Pagination from "@/components/pagination";
import FilterBar from "@/components/filter-bar";

const USERS_PER_PAGE = 10;

export default function Home() {
  const {
    users,
    currentPage,
    isLoading,
    fetchUsers,
    setPage,
    searchQuery,
    sortBy,
    sortOrder,
    theme,
  } = useStore();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    fetchUsers(1);
  }, [fetchUsers]);

  const filteredAndSortedUsers = useMemo(() => {
    let result = [...users];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(query) ||
          u.email.toLowerCase().includes(query)
      );
    }

    if (sortBy !== "none") {
      result.sort((a, b) => {
        const valA = a[sortBy].toLowerCase();
        const valB = b[sortBy].toLowerCase();
        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [users, searchQuery, sortBy, sortOrder]);

  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const paginatedUsers = filteredAndSortedUsers.slice(
    startIndex,
    startIndex + USERS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    if (users.length < newPage * USERS_PER_PAGE) {
      fetchUsers(newPage);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-background p-8 text-slate-800 dark:text-foreground transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        {/* Header & Status Bar */}
        <AppHeader />

        {/* Search & Sort Bar */}
        <FilterBar />

        {/* Loading */}
        {isLoading && paginatedUsers.length === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {Array.from({ length: USERS_PER_PAGE }).map((_, i) => (
              <div
                key={i}
                className="flex bg-white dark:bg-card rounded-xl p-4 shadow-sm border border-gray-100 dark:border-card-border animate-pulse"
              >
                <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-800" />
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-start">
                    <div className="w-full">
                      <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mb-2" />
                      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800" />
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
              className="flex bg-white dark:bg-card rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-card-border"
            >
              <Image
                src={user.image}
                alt={user.name}
                width={100}
                height={100}
                loading="lazy"
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-800"
              />
              <div className="ml-4 flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-bold text-lg text-gray-800 dark:text-gray-100">
                      {user.name}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 break-all">
                      {user.email}
                    </p>
                  </div>
                  <FavoriteButton user={user} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {!isLoading && filteredAndSortedUsers.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-card rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
            <p className="text-gray-400 dark:text-gray-500">No users found matching your search.</p>
          </div>
        )}

        {/* Pagination */}
        {filteredAndSortedUsers.length > 0 && (
          <Pagination
            currentPage={currentPage}
            isLoading={isLoading}
            handlePageChange={handlePageChange}
          />
        )}
      </div>
    </main>
  );
}
