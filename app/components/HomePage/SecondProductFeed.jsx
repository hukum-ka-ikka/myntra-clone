"use client";

import { useEffect, useState } from "react";
import ProductCard from "../core/ProductCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/app/services/Product";

const SecondProductFeed = () => {
  const productData = useSelector((state) => state.product.products);

  return (
    <div className="flex justify-around items-center w-full">
      {productData &&
        productData.map(
          (product, index) =>
            index > 3 &&
            index < 9 && <ProductCard product={product} key={product.id} />
        )}
    </div>
  );
};

export default SecondProductFeed;
