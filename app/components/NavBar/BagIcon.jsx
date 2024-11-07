"use client";

import Link from "next/link";
import React from "react";
import { AiOutlineShopping } from "react-icons/ai";

const BagIcon = () => {
  return (
    <Link href="/bag" className="flex flex-col pl-3 -mt-1">
      <AiOutlineShopping className="text-2xl" />{" "}
      <p className="text-xs font-bold">Bag</p>
    </Link>
  );
};

export default BagIcon;
