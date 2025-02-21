import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Product from "@/models/Product";
import authSeller from "@/lib/authSeller";
import connectDB from "@/config/db";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);

    const isSeller = await authSeller(userId);
    if (!isSeller) {
      return NextResponse.json(
        { success: false, message: "Not authorized" },
        { status: 403 }
      );
    }

    await connectDB();

    const products = await Product.find({ });


    return NextResponse.json({ success: true, products });

  } catch (error) {
 
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
