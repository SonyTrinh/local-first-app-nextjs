"use client";
import { User } from "@/types/user";
import { useStore } from "@/store/useStore";

interface FavoriteButtonProps {
  user: User;
}

const FavoriteButton = ({ user }: FavoriteButtonProps) => {
  const toggleFavorite = useStore((state) => state.toggleFavorite);

  return (
    <button
      onClick={() => toggleFavorite(user.uuid)}
      className="text-2xl hover:scale-110 transition-transform focus:outline-none filter dark:drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]"
    >
      {user.isFavorite ? "❤️" : "🤍"}
    </button>
  );
};

export default FavoriteButton;