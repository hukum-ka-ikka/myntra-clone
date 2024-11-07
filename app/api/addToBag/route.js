import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/models/User";
import { Bag } from "@/models/Bag";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Please login to continue" },
        { status: 401 }
      );
    }

    const { product } = await request.json();

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Please add a product" },
        { status: 400 }
      );
    }

    console.log(session.user.email);
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User doesn't exist" },
        { status: 400 }
      );
    }

    const userBag = await Bag.findOne({ user: user._id });
    let newBag;
    if (!userBag) {
      newBag = await Bag.create({
        user: user._id,
        products: [product.id],
        total: Math.round(product.price * 84 * 100) / 100,
      });
      await User.findByIdAndUpdate(user._id, { bag: newBag._id });
    } else {
      newBag = await Bag.findByIdAndUpdate(
        userBag._id,
        {
          $addToSet: { products: product.id },
          $inc: { total: Math.round(product.price * 84 * 100) / 100 },
        },
        { new: true }
      );
    }

    return NextResponse.json(
      { success: true, message: "Bag updated successfully", newBag },
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
