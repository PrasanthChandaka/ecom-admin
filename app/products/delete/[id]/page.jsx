import DeletePopup from "@/app/components/DeletePopup";
import Layout from "@/app/components/layout";
import React from "react";

const DeleteProduct = () => {
  return (
    <Layout>
      <div className="h-full w-full flex gap-5 flex-col justify-center items-center">
        <p>Do you really want to delete the Product?</p>
        <DeletePopup />
      </div>
    </Layout>
  );
};

export default DeleteProduct;
