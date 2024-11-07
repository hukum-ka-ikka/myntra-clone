import React from "react";
import { FaRegUser } from "react-icons/fa";
import AuthComp from "./AuthComp";
import Link from "next/link";

const ProfileIcon = () => {
  return (
    <div className="group flex flex-col items-center px-3 h-full hover:border-b-4 hover:border-[#F16565] hover:cursor-text pt-5 relative">
      <FaRegUser className="text-xl" />
      <p className="text-xs font-bold">Profile</p>
      <div className="absolute top-[78px] bg-white p-3 px-5 group-hover:flex group-hover:flex-col gap-4 border w-72 hidden ">
        <AuthComp />

        <div className="border-b"></div>
        <div className="flex flex-col text-sm tracking-wide font-thin gap-[2px]">
          <Link href="/orders" className="hover:font-bold">
            Orders
          </Link>
          <Link href="/wishlist" className="hover:font-bold">
            Wishlist
          </Link>
          <p className="hover:font-bold">Gift Cards</p>
          <p className="hover:font-bold">Contact Us</p>
          <div className="flex gap-2">
            <p className="hover:font-bold">Myntra Insider</p>
            <p className="bg-[#FF3F6C] text-xs font-bold text-white px-1 transform -skew-x-12 h-max pb-[1px] mt-1">
              New
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileIcon;
