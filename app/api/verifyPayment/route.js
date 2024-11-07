import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { User } from "@/models/User";
import { Order } from "@/models/Order";

export async function POST(request) {
  try {
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
    const data = await request.json();

    const razorpay_order_id = data?.razorpay_order_id;
    const razorpay_payment_id = data?.razorpay_payment_id;
    const razorpay_signature = data?.razorpay_signature;
    const products = data?.products;
    console.log("Products are...", products);

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !products
    ) {
      return NextResponse.json(
        { success: false, message: "Payment Failed" },
        { status: 400 }
      );
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature)
      return NextResponse.json(
        {
          success: false,
          message: "Payment not authorised",
        },
        { status: 401 }
      );

    addToOrders(products, session.user.email, NextResponse);
    return NextResponse.json(
      {
        success: true,
        message: "Orders added successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

const addToOrders = async (products, email, NextResponse) => {
  try {
    // Check if user exists in DB
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User doesn't exist",
        },
        { status: 401 }
      );
    }

    // Add all products as separate order
    for (const product of products) {
      const newOrder = await Order.create({
        productId: product,
        user: user._id,
      });

      await User.findByIdAndUpdate(user._id, {
        $push: { orders: newOrder._id },
      });
    }

    // Return response
    return NextResponse.json(
      {
        success: true,
        message: "Orders added successfully",
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
};
