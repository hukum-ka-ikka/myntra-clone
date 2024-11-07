"use client";

import React from "react";
import shopByCategoryImage from "../../../public/Images/shop-by-category.png";
import Image from "next/image";
import { useSelector } from "react-redux";
import CategoryBox from "./CategoryBox";

const ShopByCategory = () => {
  const categories = useSelector((state) => state.category.categories);
  return (
    <div className="w-full flex flex-col gap-2">
      <Image src={shopByCategoryImage} alt="Loading" />
      <div className="flex w-full gap-4">
        {categories &&
          Object.keys(categories).map((key) => (
            <CategoryBox text={key} key={key} linkCategoryName={key} />
          ))}
      </div>
    </div>
  );
};

export default ShopByCategory;
