"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function ProductFetch() {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const url = "/api/products";
      const response = await fetch(url);
      const resultData = await response.json();
      setData(resultData.products);
    };
    fetchData();
  }, []);

  return (
    <div className="relative flex flex-grow pr-4 rounded-md">
      <table className="w-full text-sm text-left rtl:text-right text-gray-900 font-bold dark:text-gray-400">
        <thead className="text-xs text-blue-900 uppercase bg-blue-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3 text-md md:text-lg font-bold">
              Product name
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.map((each) => {
            return (
              <tr
                key={each._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 flex justify-between items-center"
              >
                <td className="px-6 py-4 pointer-events-none">{each.name}</td>
                <div className="flex gap-2">
                  <Link href={`/products/edit/${each._id}`}>
                    <button type="button" className="btn-primary">
                      Edit
                    </button>
                  </Link>
                  <Link href={`/products/delete/${each._id}`}>
                    <button type="button" className="btn-danger">
                      Delete
                    </button>
                  </Link>
                </div>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
