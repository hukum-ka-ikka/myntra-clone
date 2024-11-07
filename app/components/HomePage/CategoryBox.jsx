import Link from "next/link";
import React from "react";

const CategoryBox = ({ text, linkCategoryName }) => {
  return (
    <Link
      href={`/products?category_name=${linkCategoryName}`}
      className="border-4 border-[#F11BAF] w-full flex justify-center items-center"
    >
      <div className="border-4 border-[#F25511] w-full flex justify-center items-center">
        {" "}
        <div className="py-4 px-5  bg-[#FF912E] text-[#9e2f4e] text-xl font-bold w-full flex justify-center items-center">
          {text.charAt(0).toUpperCase() + text.slice(1)}
        </div>
      </div>
    </Link>
  );
};

export default CategoryBox;
