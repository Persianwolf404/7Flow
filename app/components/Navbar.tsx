"use client";
import React from "react";
import Button from "./Button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Burger from "./Burger";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <header
      style={{ height: "80px" }}
      className="border-bottom border-cloudy-blue "
    >
      <div className="container h-100 d-flex align-items-center ">
        <Link
          style={{ zIndex: "10000" }}
          href={"/"}
          className="montserrat overflow-visible text-green fw-bolder fs-4 me-8"
        >
          7<span className="text-blue">flow</span>.
        </Link>
        <ul className="d-lg-flex gap-5 p-0 m-0 list-unstyled fw-bolder fs-6 d-none ">
          <Link className="text-midnight-gray" href={"/#"}>
            Pricing
          </Link>
          <Link className="text-midnight-gray" href={"/#"}>
            How it Works
          </Link>
          <Link className="text-midnight-gray" href={"/#"}>
            FAQ
          </Link>
          <Link
            className={
              pathname === "/currencies" ? "text-green" : "text-midnight-gray"
            }
            href={"/currencies"}
          >
            Currencies
          </Link>
        </ul>
        <div className="ms-auto d-lg-flex align-items-center d-none">
          <button className="bg-transparent border-0 fs-6 fw-bolder text-midnight-gray me-4">
            Sign in
          </button>
          <Button className="ms-7">Get Started</Button>
        </div>
        <Burger />
      </div>
    </header>
  );
};

export default Navbar;
