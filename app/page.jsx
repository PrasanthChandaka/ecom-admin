import React from "react";
import Layout from "./components/layout";
import Image from "next/image";

const Home = () => {
  return (
    <Layout>
      <div className="flex justify-between">
        <h1 className="text-blue-900 text-xl">
          Hello <b>Prasanth Chandaka</b>
        </h1>
        <div className="flex gap-2 bg-blue-100 items-center cursor-pointer">
          <Image
            src=""
            alt=""
            height={100}
            width={100}
            className="h-8 w-8 rounded-full"
          />
          <span className="text-blue-900 font-bold">Prasanth Chandaka</span>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
