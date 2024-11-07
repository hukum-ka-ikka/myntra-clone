import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { dbConnect } from "@/configs/database";
import { User } from "@/models/User";
import { NextResponse } from "next/server";
import { Bag } from "@/models/Bag";

export async function DELETE(request) {
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

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User doesn't exist" },
        { status: 401 }
      );
    }

    const deleteBag = await Bag.findByIdAndDelete(user.bag);
    const updateUser = await User.findByIdAndUpdate(user._id, { bag: null });

    return NextResponse.json(
      {
        success: true,
        message: "Cleared bag successfully",
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
