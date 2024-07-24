"use client";

import { redirect, useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const UpdateProduct = () => {
  const [updatedName, setUpdatedName] = useState();
  const [updatedDescription, setUpdatedDescription] = useState();
  const [updatedPrice, setUpdatedPrice] = useState();
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const updateApi = async () => {
      const url = `/api/products/update/${params.id}`;
      const response = await fetch(url);
      const result = await response.json();
      const product = result.getProduct;
      setUpdatedName(product.name);
      setUpdatedDescription(product.description);
      setUpdatedPrice(product.price);
    };
    updateApi();
  }, [params.id]);

  const submitUpdateForm = async (e) => {
    e.preventDefault();
    const url = `/api/products/update/${params.id}`;

    const data = {
      name: updatedName,
      description: updatedDescription,
      price: updatedPrice,
    };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);
    const result = await response.json();

    if (response.ok) {
      alert(result.message);
      router.push("/products");
    } else {
      alert("Failed to update product");
    }
  };

  return (
    <form onSubmit={submitUpdateForm}>
      <label className="label">
        Name:
        <input
          type="text"
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
        />
      </label>
      <label className="label">
        Description:
        <input
          type="text"
          value={updatedDescription}
          onChange={(e) => setUpdatedDescription(e.target.value)}
        />
      </label>
      <label className="label">
        Price:
        <input
          type="number"
          value={updatedPrice}
          onChange={(e) => setUpdatedPrice(e.target.value)}
        />
      </label>
      <button type="submit" className="btn-primary">
        Update
      </button>
    </form>
  );
};

export default UpdateProduct;
