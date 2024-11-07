"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchProducts } from "@/app/services/Product";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../core/ProductCard";
import myntraFooter from "../../../public/Images/myntra-footer.png";
import Image from "next/image";
import Link from "next/link";
import { RiFilterLine } from "react-icons/ri";

const Products = () => {
  const categories = useSelector((state) => state.category.categories);
  const { areProductsLoaded, products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const searchParams = useSearchParams();
  const categoryName = searchParams.get("category_name");
  const [showCategories, setShowCategories] = useState(false);

  const [productData, setProductData] = useState(null);

  const getCategoryProducts = async () => {
    if (!areProductsLoaded) {
      await fetchProducts(dispatch);
    }

    if (categories) {
      setProductData(categories[categoryName]);
    }
  };

  useEffect(() => {
    getCategoryProducts();
  }, [searchParams, areProductsLoaded, products]);

  return (
    <div className="w-full flex flex-col items-center gap-6 justify-center">
      <div className="w-full flex justify-between mt-6 px-6">
        <p className="text-4xl font-semibold text-gray-700">
          {categoryName === "all"
            ? "All Products"
            : categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
        </p>
        <div className="flex flex-col relative">
          <button
            onClick={() => setShowCategories((prev) => !prev)}
            className="flex gap-2 items-center py-3 px-4 border border-[#FF3F6C] text-[#FF3F6C]"
          >
            <RiFilterLine className="text-xl" /> <p>Categories</p>
          </button>
          {showCategories && categories && (
            <nav className="absolute flex flex-col z-20 bg-white top-[52px] w-full border border-t-0">
              {Object.keys(categories).map((categoryName) => (
                <Link
                  href={`/products?category_name=${categoryName}`}
                  className="border-b px-3 py-1"
                  onClick={() => setShowCategories((prev) => !prev)}
                >
                  {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center flex-wrap gap-5">
        {productData &&
          productData.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
      </div>
      <Image src={myntraFooter} alt="Loading..." />
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading Products...</div>}>
      <Products />
    </Suspense>
  );
}
