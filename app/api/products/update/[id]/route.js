import product from "@/lib/models/model";
import { mongooseConnect } from "@/lib/utils/connection";
import { NextResponse } from "next/server";

async function connection() {
  await mongooseConnect();
}

connection();

export async function GET(req, context) {
  // return NextResponse.json({ message: "get by id" });
  const id = context.params.id;
  try {
    const getProduct = await product.findById(id);
    if (!getProduct) {
      return NextResponse.json({ success: false, error: "Product not found" });
    }
    return NextResponse.json({ success: true, getProduct });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function PUT(req, context) {
  const id = context.params.id;
  const { name, description, price } = await req.json();
  try {
    const productId = await product.findById(id);
    if (productId) {
      const updatedData = {
        name: name || productId.name,
        description: description || productId.description,
        price: price || productId.price,
      };
      const updatedProduct = await product.findByIdAndUpdate(id, updatedData);
      return NextResponse.json({ success: true, message: "Product updated" });
    }
    return NextResponse.json({ success: false, message: "Product not found" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
