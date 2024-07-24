"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const DeletePopup = () => {
  const router = useRouter();
  const params = useParams();

  const onDeleteItem = async () => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      `http://localhost:3000/api/products/delete/${params.id}`,
      options
    );
    if (response.ok) {
      router.push("/products");
    }
  };

  return (
    <div className="flex gap-3">
      <button type="button" className="btn-danger" onClick={onDeleteItem}>
        Yes
      </button>
      <button
        type="button"
        className="btn-gray"
        onClick={() => router.push("/products")}
      >
        No
      </button>
    </div>
  );
};

export default DeletePopup;
