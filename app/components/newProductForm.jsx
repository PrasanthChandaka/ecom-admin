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

  return (
    <form onSubmit={submitHandler}>
      <h1 className="text-blue-900 text-xl font-bold mb-2">New Product</h1>
      <label className="text-blue-900 font-semibold">Product Name</label>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label className="text-blue-900 font-semibold">Product Name</label>
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
