import React from "react";
import { FaRegHeart } from "react-icons/fa";

const WishlistIcon = () => {
  return (
    <button className="px-3 flex flex-col items-center gap-[2px]">
      <FaRegHeart className="text-lg" />
      <p className="text-xs font-bold">Wishlist</p>
    </button>
  );
};

export default WishlistIcon;
