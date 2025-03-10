"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "./Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { HiBars2 } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";

function Burger() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Scroll lock implementation with useEffect to handle browser APIs
  useEffect(() => {
    // Keys for preventing arrow key scrolling
    const keys: Record<number, number> = { 37: 1, 38: 1, 39: 1, 40: 1 };

    function preventDefault(e: Event): void {
      e.preventDefault();
    }

    function preventDefaultForScrollKeys(
      e: KeyboardEvent
    ): boolean | undefined {
      if (keys[e.keyCode as number]) {
        preventDefault(e);
        return false;
      }
      return undefined;
    }

    // Determine wheel event type and passive support
    let wheelEvent: string = "wheel";
    let wheelOpt: boolean | AddEventListenerOptions = false;

    if (typeof window !== "undefined") {
      wheelEvent =
        "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

      // Check for passive event support
      let supportsPassive = false;
      try {
        // Using a property with a getter for detection
        const opts = Object.defineProperty({}, "passive", {
          get: function () {
            supportsPassive = true;
            return true;
          },
        });

        // Need to use a non-null function for the listener to make TypeScript happy
        window.addEventListener(
          "testPassive" as keyof WindowEventMap,
          () => {},
          opts as AddEventListenerOptions
        );
        window.removeEventListener(
          "testPassive" as keyof WindowEventMap,
          () => {},
          opts as AddEventListenerOptions
        );
      } catch (e) {
        console.log(e)
      }

      wheelOpt = supportsPassive ? { passive: false } : false;
    }

    // Apply or remove scroll lock based on menu state
    if (show) {
      window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
      window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
      window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
      window.addEventListener(
        "keydown",
        preventDefaultForScrollKeys as EventListener,
        false
      );
    }

    // Cleanup function to remove event listeners when component unmounts or show changes
    return () => {
      window.removeEventListener("DOMMouseScroll", preventDefault, false);
      window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
      window.removeEventListener("touchmove", preventDefault, wheelOpt);
      window.removeEventListener(
        "keydown",
        preventDefaultForScrollKeys as EventListener,
        false
      );
    };
  }, [show]); // Only re-run when show state changes

  return (
    <div className="w-100 d-flex justify-content-end d-lg-none">
      <button
        style={{ width: "48px", height: "48px", zIndex: "10000" }}
        className={`d-flex ${
          show ? "border border-sky-blue bg-transparent" : "bg-blue border-0"
        } rounded-circle justify-content-center align-items-center z-5`}
        onClick={show ? handleClose : handleShow}
      >
        {show ? (
          <RxCross2 className="text-blue fs-3" />
        ) : (
          <HiBars2 className="text-white fs-3" />
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
                  className={
                    pathname === "/" ? "text-green" : "text-midnight-gray"
                  }
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
