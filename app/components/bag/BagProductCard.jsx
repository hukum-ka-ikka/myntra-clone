import { removeFromBag } from "@/app/services/Bag";
import Image from "next/image";
import React from "react";
import { GiReturnArrow } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";

const BagProductCard = ({ product }) => {
  const dispatch = useDispatch();
  return (
    <div className="w-full flex gap-2 border py-3 px-2">
      <div>
        <Image src={product.images[0]} width={150} height={200} />
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="w-[80%] flex flex-col">
          <p className="font-semibold">{product.brand}</p>
          <p>{product.title}</p>
          <p className="text-sm text-gray-500">{product.description}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold">
            ₹ {Math.round(product.price * 84 * 100) / 100}
          </p>
          <div className="flex gap-1">
            <GiReturnArrow className="text-sm mt-1" />
            <p className="text-sm font-medium">{product.returnPolicy}</p>
          </div>
        </div>
      </div>
      <button onClick={() => removeFromBag(product, dispatch)} className="h-max">
        <IoMdClose className="text-2xl" />
      </button>
    </div>
  );
};

export default BagProductCard;
