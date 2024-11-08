import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { IoMdBackspace } from "react-icons/io";

const OrderPageRouter = () => {
  const { data: session } = useSession();

  return session ? (
    <Link href="/orders" className="hover:font-bold">
      Orders
    </Link>
  ) : (
    <p
      className="hover:font-bold hover:cursor-pointer"
      onClick={() => toast.error("Please login to continue")}
    >
      Orders
    </p>
  );
};

export default OrderPageRouter;
