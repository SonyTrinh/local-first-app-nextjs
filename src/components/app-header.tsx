"use client";

interface AppHeaderProps {
  isOffline: boolean;
}

const AppHeader = ({ isOffline }: AppHeaderProps) => {
  return (
    <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          User List
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Next.js • Zustand • Dexie.js
        </p>
      </div>

      <div className="text-right">
        {isOffline ? (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            ● Offline Mode
          </span>
        ) : (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            ● Online
          </span>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
