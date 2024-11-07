"use client";

import { addToBag, removeFromBag } from "@/app/services/Bag";
import Image from "next/image";
import React from "react";
import { AiFillShopping, AiOutlineShopping } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddtoBag = async () => {
    await addToBag(product, dispatch);
  };

  return (
    <div className="flex flex-col h-max relative border group">
      <Image
        src={product.images[0]}
        width={210}
        height={210}
        alt="Loading"
        unoptimized
        style={{ width: "210px", height: "210px" }}
      />

      <div className="w-full flex flex-col px-3 py-1 border-t group-hover:border-0">
        <div className="w-full flex flex-col ">
          <p className="text-lg font-semibold group-hover:bg-white group-hover:text-white">
            {product.brand}
          </p>
          <p className="text-sm group-hover:bg-white group-hover:text-white">
            {product.title.length > 25
              ? `${product.title.slice(0, 25)}...`
              : product.title}
          </p>
        </div>

        <p className="text-sm font-semibold mt-1">
          Rs. {Math.round(product.price * 84 * 100) / 100}
        </p>
      </div>

      <div className="absolute group-hover:flex group-hover:flex-col w-full bg-white z-10 px-4 gap-2 top-48 hidden">
        <button className="w-full flex gap-2 items-center justify-center border py-1">
          <FaRegHeart />
          <p className="text-sm font-semibold">WISHLIST</p>
        </button>
        {product.addedToBag ? (
          <button
            onClick={() => removeFromBag(product, dispatch)}
            className="w-full flex gap-2 items-center justify-center border bg-[#FF3F6C] text-white py-1"
          >
            <AiFillShopping className="text-lg" />
            <p className="text-sm font-semibold">ADDED TO BAG</p>
          </button>
        ) : (
          <button
            onClick={handleAddtoBag}
            className="w-full flex gap-2 items-center justify-center border border-[#FF3F6C] text-[#FF3F6C] py-1"
          >
            <AiOutlineShopping className="text-lg" />
            <p className="text-sm font-semibold">ADD TO BAG</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
