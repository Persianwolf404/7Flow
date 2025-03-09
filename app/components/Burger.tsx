"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Button from "./Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { HiBars2 } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";

function Burger() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const pathname = usePathname();

  return (
    <div className="w-100 d-flex justify-content-end d-lg-none">
      <button
        style={{ width: "48px", height: "48px", zIndex: "10000" }}
        className={`d-flex  ${
          show ? "border border-sky-blue bg-transparent" : "bg-blue border-0"
        }  rounded-circle justify-content-center align-items-center z-5`}
        onClick={show ? handleClose : handleShow}
      >
        {show ? (
          <RxCross2 className="text-blue fs-3 " />
        ) : (
          <HiBars2 className="text-white fs-3 " />
        )}
      </button>

      <Offcanvas
        show={show}
        onHide={handleClose}
        className="w-100 bg-background d-lg-none"
        backdrop={true}
        scroll={false}
      >
        <Offcanvas.Body className="d-flex flex-column h-100 container overflow-hidden">
          <div className="row mt-7 py-6 flex-grow-1 border-top border-cloudy-blue">
            <div className="col-12">
              <ul className="d-flex flex-column gap-5 p-0 m-0 list-unstyled fw-bolder fs-4">
                <Link
                  onClick={handleClose}
                  className="text-midnight-gray"
                  href={"/"}
                >
                  Home
                </Link>
                <Link
                  onClick={handleClose}
                  className="text-midnight-gray"
                  href={"/#"}
                >
                  Pricing
                </Link>
                <Link
                  onClick={handleClose}
                  className="text-midnight-gray"
                  href={"/#"}
                >
                  How it Works
                </Link>
                <Link
                  onClick={handleClose}
                  className="text-midnight-gray"
                  href={"/#"}
                >
                  FAQ
                </Link>
                <Link
                  onClick={handleClose}
                  className={
                    pathname === "/currencies"
                      ? "text-green"
                      : "text-midnight-gray"
                  }
                  href={"/currencies"}
                >
                  Currencies
                </Link>
              </ul>
            </div>
          </div>

          <div className="row mt-auto mb-4">
            <div className="col-12">
              <Button className="w-100">Get Started</Button>
              <button className="mt-4 bg-transparent border-0 fs-6 fw-bolder text-midnight-gray me-4 w-100">
                Sign in
              </button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Burger;
