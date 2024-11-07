import { addToOrders } from "@/app/services/Order";
import { useSession } from "next-auth/react";
import React from "react";
import { useDispatch } from "react-redux";

const PriceDetails = ({ bag, total }) => {
  const totalAmount = Math.round(total * 100) / 100;
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const handlePlaceOrderClick = async () => {
    await addToOrders(bag, totalAmount + 20, session.user, dispatch);
  };

  return (
    <div className="w-[40%] flex flex-col gap-3 text-sm border h-max p-3 text-gray-700">
      <p className="text-sm font-bold ">{`PRICE DETAILS (${bag.length} items)`}</p>
      <div className="flex justify-between">
        <p>Total Amount</p>
        <p>₹ {totalAmount}</p>
      </div>
      <div className="flex justify-between">
        <p>Platform Fee</p>
        <p>₹ 20</p>
      </div>
      <div className="flex justify-between">
        <p>Shipping Fee</p>
        <p className="text-green-600">Free</p>
      </div>
      <div className="flex flex-col gap-3 border-t py-1">
        <div className="flex justify-between font-bold text-gray-700">
          <p>Amount Payable</p>
          <p>₹ {totalAmount + 20}</p>
        </div>
        <button
          onClick={handlePlaceOrderClick}
          className="text-md font-bold text-white bg-[#FF3F6C] py-2"
        >
          PLACE ORDER
        </button>
      </div>
    </div>
  );
};

export default PriceDetails;
