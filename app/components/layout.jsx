import React from "react";
import Nav from "./nav";

const Layout = ({ children }) => {
  return (
    <div className="bg-blue-900 w-screen h-screen flex justify-center">
      <Nav />
      <div className="bg-white flex-grow my-2 mr-2 rounded-lg p-4 pr-0 border-none">
        {children}
      </div>
    </div>
  );
};

export default Layout;
