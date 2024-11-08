"use client";

import { addToOrders } from "@/app/services/Order";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const PlaceOrder = ({ bag, total }) => {
  const totalAmount = Math.round(total * 100) / 100;
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();

  const handlePlaceOrderClick = async () => {
    await addToOrders(bag, totalAmount + 20, session.user, dispatch, router);
  };
  return (
    <button
      onClick={handlePlaceOrderClick}
      className="text-md font-bold text-white bg-[#FF3F6C] py-2"
    >
      PLACE ORDER
    </button>
  );
};

export default PlaceOrder;
