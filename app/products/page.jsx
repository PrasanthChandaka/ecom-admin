import React from "react";
import Layout from "../components/layout";
import Link from "next/link";
import ProductFetch from "../components/productFetch";

const Products = () => {
  return (
    <Layout>
      <div className="h-full w-full flex flex-col gap-5 relative overflow-y-auto">
        <Link href="/products/new" className="sticky top-0 z-10">
          <button type="button" className="btn-primary">
            Add New Product
          </button>
        </Link>
        <ProductFetch />
      </div>
    </Layout>
  );
};

export default Products;
