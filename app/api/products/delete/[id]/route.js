import product from "@/lib/models/model";
import { mongooseConnect } from "@/lib/utils/connection";
import { NextResponse } from "next/server";

async function connection() {
  await mongooseConnect();
}

connection();

export async function DELETE(req, context) {
  const id = context.params.id;
  await product.findByIdAndDelete(id);
  return NextResponse.json({
    success: true,
    message: "product deleted successful",
  });
}
