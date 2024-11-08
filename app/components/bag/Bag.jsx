"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import emptyBag from "../../../public/Images/empty-bag.png";
import Image from "next/image";
import Link from "next/link";
import { fetchProducts } from "@/app/services/Product";
import BagProductCard from "./BagProductCard";
import PriceDetails from "./PriceDetails";

const Bag = () => {
  const { bagItems: bag, total } = useSelector((state) => state.bag);
  const productData = useSelector((state) => state.product.products);

  const dispatch = useDispatch();

  const getProducts = async () => {
    const products = await fetchProducts(dispatch);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="w-full flex justify-center mb-2">
      {bag.length === 0 ? (
        <div className="w-full flex flex-col justify-center items-center h-[500px]">
          <Image src={emptyBag} width={200} height={200} alt="Loading" />
          <p className="text-2xl text-gray-700 font-bold">
            Hey, it feels so light!
          </p>
          <p>There is nothing in your bag. Let's add some items.</p>
          <Link
            href="/"
            className="mt-7 border px-4 py-2 border-[#FF3F6C] text-[#FF3F6C] font-bold"
          >
            SHOP NOW
          </Link>
        </div>
      ) : (
        <div className="flex gap-10 justify-center mt-20 px-32">
          <div className="flex flex-col gap-4 w-full">
            {productData.map(
              (product) =>
                product.addedToBag && <BagProductCard product={product} />
            )}
          </div>
          <PriceDetails total={total} bag={bag} />
        </div>
      )}
    </div>
  );
};

export default Bag;
