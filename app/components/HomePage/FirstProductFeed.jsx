"use client";

import { useEffect, useState } from "react";
import ProductCard from "../core/ProductCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/app/services/Product";

const FirstProductFeed = () => {
  const productData = useSelector((state) => state.product.products);

  const dispatch = useDispatch();

  const getProducts = async () => {
    const products = await fetchProducts(dispatch);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex justify-around items-center w-full">
      {productData &&
        productData.map(
          (product, index) =>
            index < 4 && <ProductCard product={product} key={product.id} />
        )}
    </div>
  );
};

export default FirstProductFeed;
