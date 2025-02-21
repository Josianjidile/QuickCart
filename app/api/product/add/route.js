import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import authSeller from "@/lib/authSeller";
import connectDB from "@/config/db";
import Product from "@/models/Product";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    // Authenticate User
    const { userId } = getAuth(request);
    const isSeller = await authSeller(userId);

    if (!isSeller) {
      return NextResponse.json(
        { success: false, message: "Not authorized" },
        { status: 403 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const name = formData.get("name");
    const description = formData.get("description");
    const category = formData.get("category");
    const price = formData.get("price");
    const offerPrice = formData.get("offerPrice");
    const files = formData.getAll("images");

    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, message: "No file uploaded" },
        { status: 400 }
      );
    }

    // Upload images to Cloudinary
    const result = await Promise.all(
      files.map((file) => {
        return new Promise((resolve, reject) => {
          file
            .arrayBuffer()
            .then((arrayBuffer) => {
              const buffer = Buffer.from(arrayBuffer);
              const stream = cloudinary.uploader.upload_stream(
                { resource_type: "auto" },
                (error, result) => {
                  if (error) {
                    reject(error);
                  } else {
                    resolve(result);
                  }
                }
              );
              stream.end(buffer);
            })
            .catch(reject);
        });
      })
    );

    // Extract image URLs
    const image = result.map((r) => r.secure_url);

    // Connect to Database
    await connectDB();

    // Create new Product
    const newProduct = await Product.create({
      userId,
      name,
      description,
      category,
      price: Number(price),
      offerPrice: Number(offerPrice),
      image,
      date: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: "Product uploaded successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
