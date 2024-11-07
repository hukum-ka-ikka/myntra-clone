import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/models/User";
import { Order } from "@/models/Order";

import { dbConnect } from "@/configs/database";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Please login to continue" },
        { status: 401 }
      );
    }

    await dbConnect();
    console.log("HIiiiiiiiiiiiiiii");

    const user = await User.findOne({ email: session.user.email })
      .populate("orders")
      .exec();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User doesn't exist" },
        { status: 400 }
      );
    }

    const userOrders = user.orders;
    if (userOrders.length === 0) {
      return NextResponse.json(
        {
          success: true,
          message: "No orders yet",
          userOrders: null,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Orders fetched successfully", userOrders },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
