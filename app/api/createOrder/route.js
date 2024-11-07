import { instance } from "@/configs/razorpay";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { dbConnect } from "@/configs/database";

export async function POST(request) {
  try {
    // Check if user is logged in
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login to continue",
        },
        { status: 401 }
      );
    }

    // Connect to DB and parse request
    await dbConnect();
    const { total } = await request.json();

    const options = {
      amount: Math.trunc(total * 100),
      currency: "INR",
    };

    const order = await instance.orders.create(options);
    return NextResponse.json(
      {
        success: true,
        message: "Order created successfully",
        order,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
