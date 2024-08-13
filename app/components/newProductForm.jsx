"use client";
import Layout from "@/app/components/layout";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";

const NewProductForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const router = useRouter();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (name !== "" && description !== "" && price !== "") {
      const url = "/api/products";
      const data = {
        name,
        description,
        price,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(url, options);
      if (response.ok) {
        alert("product added successfully");
        router.push("/products");
      } else {
        alert("Failed to add product");
      }
    } else {
      alert("Please fill all the fields");
      return;
    }
    setName("");
    setDescription("");
    setPrice("");
  };

  const imageUpload = (e) => {
    const files = e.target.files[0];
    if (files) {
      const formData = new FormData();
      formData.append("image", files);
    } else {
      alert("No image selected");
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="h-full w-full overflow-y-auto pr-4"
    >
      <h1 className="text-blue-900 text-xl font-bold mb-2">New Product</h1>
      <label className="text-blue-900 font-semibold">Product Name</label>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="w-full flex flex-wrap gap-5">
        <label className="bg-gray-200 flex items-center justify-center rounded-md h-[90px] w-[90px] aspect-square cursor-pointer">
          <input type="file" className="hidden" onChange={imageUpload} />
          upload
        </label>
      </div>
      <label className="text-blue-900 font-semibold">Product Description</label>
      <textarea
        placeholder="Description"
        className="w-full py-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <label className="text-blue-900 font-semibold">Price (in INR)</label>
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
};

export default NewProductForm;
