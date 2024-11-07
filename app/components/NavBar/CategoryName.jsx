"use client";

import { useState } from "react";

const CategoryName = ({ name, borderColor }) => {
  const [showBorder, setShowBorder] = useState(false);
  return (
    <p
      className="font-bold text-xs tracking-wider h-full flex items-center hover:cursor-pointer"
      style={{
        borderBottom: showBorder
          ? `4px solid ${borderColor}`
          : "4px solid transparent",
        padding: "8px",
        outline: "none",
        transition: "border-color 0.2s ease", // Smooth transition
      }}
      onMouseEnter={() => setShowBorder(true)}
      onMouseLeave={() => setShowBorder(false)}
    >
      {name}
    </p>
  );
};

export default CategoryName;
