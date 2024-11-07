import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/models/User";
import { Bag } from "@/models/Bag";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        {
          success: true,
          message: "Bag doesn't exist",
          userBag: { products: [] },
        },
        { status: 200 }
      );
    }

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User doesn't exist" },
        { status: 400 }
      );
    }

    const userBag = await Bag.findOne({ user: user._id });
    if (!userBag) {
      return NextResponse.json(
        {
          success: true,
          message: "Bag doesn't exist",
          userBag: { products: [] },
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Bag fetched successfully", userBag },
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
