import { categoryModel } from "@/lib/categoryModel/category";
import { mongooseConnect } from "@/lib/utils/connection";
import { NextResponse } from "next/server";

async function connection() {
  await mongooseConnect();
}

connection();

export async function POST(req) {
  const { name, parent } = await req.json();
  try {
    const categoryName = await categoryModel.findOne({ name });
    if (categoryName) {
      return NextResponse.json({
        success: false,
        message: "category name already exists",
      });
    }
    const newCategoryName = new categoryModel({ name, parent });
    await newCategoryName.save();
    return NextResponse.json({
      success: true,
      message: "category Added successfully",
      newCategoryName,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
      error,
    });
  }
}

//update method ......................................................................

export async function PUT(req) {
  const { _id, name, parent } = await req.json();
  try {
    const updatedCategory = await categoryModel.updateOne(
      { _id },
      { _id, name, parent }
    );
    return NextResponse.json({
      success: true,
      message: "category Added successfully",
      updatedCategory,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "category update failed",
    });
  }
}

//delete method.................................................................................

export async function DELETE(req) {
  const { _id } = await req.json();
  try {
    await categoryModel.deleteOne({ _id });
    return NextResponse.json({
      success: true,
      message: "category deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}

//get method.................................................................................

export async function GET() {
  try {
    const categories = await categoryModel.find({}).populate("parent");
    return NextResponse.json({ success: true, categories });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
