import product from "@/lib/models/model";
import { mongooseConnect } from "@/lib/utils/connection";
import { NextResponse } from "next/server";

async function connection() {
  await mongooseConnect();
}

connection();

export async function POST(req) {
  const { name, description, price } = await req.json();
  const newProduct = new product({ name, description, price });
  try {
    await newProduct.save();
    return NextResponse.json({ success: true, message: "Product created" });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}

export async function GET() {
  try {
    const products = await product.find({});
    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
