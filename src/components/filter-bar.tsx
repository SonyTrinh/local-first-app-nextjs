"use client";

import { useStore } from "@/store/useStore";

const FilterBar = () => {
  const {
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    sortOrder,
    toggleSortOrder,
  } = useStore();

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white dark:bg-card p-4 rounded-xl shadow-sm border border-transparent dark:border-card-border transition-colors">
      {/* Search Input */}
      <div className="flex-1 relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </span>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 transition-colors"
        />
      </div>

      {/* Sort Controls */}
      <div className="flex gap-2">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          <option value="none">No Sorting</option>
          <option value="name">Sort by Name</option>
          <option value="email">Sort by Email</option>
        </select>

        <button
          onClick={toggleSortOrder}
          disabled={sortBy === "none"}
          className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors flex items-center gap-1"
        >
          {sortOrder === "asc" ? "↑" : "↓"}
          <span className="hidden sm:inline">{sortOrder.toUpperCase()}</span>
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
