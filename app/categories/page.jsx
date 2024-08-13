"use client";
import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import toast from "react-hot-toast";
import { MdDelete, MdEdit } from "react-icons/md";
import { withSwal } from "react-sweetalert2";

function Categories({ swal }) {
  const [parent, setParent] = useState(null);
  const [Category, setCategory] = useState("");
  const [data, setData] = useState([]);
  const [categoryItem, setCategoryItem] = useState(null);

  const categoryFetching = async () => {
    const url = "http://localhost:3000/api/products/category";
    const response = await fetch(url);
    const data = await response.json();
    setData(data.categories);
  };

  useEffect(() => {
    categoryFetching();
  }, []);

  const editCategory = async (each) => {
    setCategoryItem(each);
    setCategory(each.name);
    if (each.parent?._id) {
      setParent(each?.parent?._id);
    } else {
      setParent(null);
    }
  };

  const submitCategory = async (e) => {
    e.preventDefault();
    const data = {
      name: Category,
      parent,
    };
    if (categoryItem) {
      const url = "http://localhost:3000/api/products/category";
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, _id: categoryItem?._id }),
      };
      const response = await fetch(url, options);

      const res = await response.json();
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
      setCategoryItem(null);
      setCategory("");
      setParent("");
    } else {
      const url = "http://localhost:3000/api/products/category";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(url, options);
      const res = await response.json();

      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }

      setCategory("");
      setParent(null);
    }

    categoryFetching();
  };

  const deleteCategory = async (item) => {
    swal
      .fire({
        title: "Are you sure?",
        text: `Do you really want to delete ${item.name}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "No", //
        confirmButtonText: "Yes, delete it!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed === true) {
          async function deleteItem() {
            const response = await fetch(
              "http://localhost:3000/api/products/category",
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ _id: item._id }),
              }
            );
            const data = await response.json();
            if (data.success) {
              toast.success(data.message);
            } else {
              toast.error(data.message);
            }
          }
          deleteItem();

          categoryFetching();
        }
      });
  };

  return (
    <Layout>
      <div className="w-full h-full overflow-y-auto overflow-x-hidden pr-2">
        <h1 className="text-blue-900 font-bold text-2xl mb-3">Categories</h1>
        <form onSubmit={submitCategory} className="w-full">
          <label className="text-blue-900 font-semibold text-xl">
            {categoryItem ? "Edit category Name" : "New Category Name"}
          </label>

          <div className="flex gap-2 flex-wrap sm:flex-nowrap">
            <input
              className="mb-0"
              type="text"
              value={Category}
              placeholder="Category Name"
              onChange={(e) => setCategory(e.target.value)}
            />
            <select
              value={parent}
              className="mb-0"
              onChange={(e) => setParent(e.target.value)}
            >
              <option value="">none</option>
              {data?.map((each) => (
                <option value={each._id} key={each._id}>
                  {each.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-900"
            >
              Save
            </button>
          </div>
        </form>
        <table className="w-full mt-4 rtl:text-right">
          <thead>
            <tr className="bg-blue-600 text-white font-semibold uppercase text-left text-xs text-md">
              <td className="border p-2">Category Name</td>
              <td className="border p-2">Parent Category</td>
              <td className="p-2"></td>
            </tr>
          </thead>
          <tbody className="text-xs md:text-sm">
            {data.map((each) => (
              <tr key={each._id}>
                <td className="border p-2 pointer-events-none">{each.name}</td>
                <td className="border p-2 pointer-events-none">
                  {each.parent?.name}
                </td>
                <td className="flex gap-1 justify-center border p-2 flex-wrap">
                  <button
                    className="btn-primary flex items-center gap-1"
                    type="button"
                    onClick={() => editCategory(each)}
                  >
                    <MdEdit size={20} />
                    Edit
                  </button>
                  <button
                    className="btn-danger flex items-center gap-1"
                    type="button"
                    onClick={() => deleteCategory(each)}
                  >
                    <MdDelete size={20} />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
