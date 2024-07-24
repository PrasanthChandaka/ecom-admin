"use client";

import Link from "next/link";
import React, { useState } from "react";
import { RiLogoutBoxFill } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { FaRectangleList } from "react-icons/fa6";
import { FaBoxOpen } from "react-icons/fa";
import { usePathname } from "next/navigation";

const Nav = () => {
  const pathName = usePathname();
  const inactiveLink = "flex gap-2 items-center p-2";
  const activeLink =
    inactiveLink + " bg-white text-blue-900 font-bold rounded-l-lg";

  return (
    <div className="p-4 pr-0 flex flex-col gap-5 text-white border-none">
      <nav className="flex flex-col gap-4">
        <Link href="/" className={pathName === "/" ? activeLink : inactiveLink}>
          <FaHome size={25} />
          <span className="hidden md:block">Dashboard</span>
        </Link>
        <Link
          href="/products"
          className={pathName.includes("/products") ? activeLink : inactiveLink}
        >
          <FaBoxOpen size={25} />
          <span className="hidden md:block">Products</span>
        </Link>
        <Link
          href="/orders"
          className={pathName.includes("/orders") ? activeLink : inactiveLink}
        >
          <FaRectangleList size={25} />
          <span className="hidden md:block">Orders</span>
        </Link>
        <Link
          href="/settings"
          className={pathName.includes("/settings") ? activeLink : inactiveLink}
        >
          <MdSettings size={25} />
          <span className="hidden md:block">Settings</span>
        </Link>
      </nav>
      <Link href="/" className="flex gap-2 p-2 items-center">
        <RiLogoutBoxFill size={25} />
        <span className="hidden md:block">Logout</span>
      </Link>
    </div>
  );
};

export default Nav;
