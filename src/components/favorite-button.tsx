"use client";
import { User } from "@/lib/db";
import { useStore } from "@/store/useStore";

interface FavoriteButtonProps {
  user: User;
}

const FavoriteButton = ({ user }: FavoriteButtonProps) => {
  const toggleFavorite = useStore((state) => state.toggleFavorite);

  return (
    <button
      onClick={() => toggleFavorite(user.uuid)}
      className="text-2xl hover:scale-110 transition-transform focus:outline-none"
    >
      {user.isFavorite ? "❤️" : "🤍"}
    </button>
  );
};

export default FavoriteButton;