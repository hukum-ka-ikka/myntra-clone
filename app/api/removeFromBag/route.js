import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { dbConnect } from "@/configs/database";
import { User } from "@/models/User";
import { NextResponse } from "next/server";
import { Bag } from "@/models/Bag";

export async function PUT(request) {
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

    await dbConnect();
    const { product } = await request.json();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User doesn't exist" },
        { status: 400 }
      );
    }

    const userBag = await Bag.findById(user.bag);
    console.log("User is",user)

    let newBag;
    if (userBag.products.length === 1) {
      await Bag.findByIdAndDelete(user.bag, { new: true });
      await User.findByIdAndUpdate(user._id, { bag: null });
      newBag = null;
    } else {
      newBag = await Bag.findByIdAndUpdate(
        user.bag,
        {
          $pull: { products: product.id },
          $inc: { total: -Math.round(product.price * 84 * 100) / 100 },
        },
        { new: true }
      );
    }
    console.log("NewBag is", newBag);

    return NextResponse.json(
      {
        success: true,
        message: "Item removed successfully",
        newBag,
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
