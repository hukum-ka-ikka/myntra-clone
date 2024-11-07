import Image from "next/image";
import React from "react";
import { GiReturnArrow } from "react-icons/gi";

const OrderProductCard = ({ product, orderedOn }) => {
  return (
    <div className="w-full flex gap-2 border py-3 px-2">
      <div>
        <Image src={product.images[0]} width={150} height={200} alt="Loading" />
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

          <p className="text-sm font-medium">
            Ordered On{" "}
            {new Date(orderedOn)
              .toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
              .replace(" ", ", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderProductCard;
