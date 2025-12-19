import { useStore } from "@/store/useStore";

const AppHeader = () => {
  const { 
    isOffline, 
    theme, 
    toggleTheme 
  } = useStore();

  return (
    <header className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white dark:bg-card p-6 rounded-2xl shadow-sm dark:shadow-none border border-transparent dark:border-card-border transition-colors">
      <div className="mb-4 md:mb-0">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
          User List
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          Next.js • Zustand • Dexie.js
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          title="Toggle Theme"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        {/* Real Status */}
        <div className="text-right hidden sm:block">
          {isOffline ? (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400">
              ● Connection: Offline
            </span>
          ) : (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
              ● Online
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
