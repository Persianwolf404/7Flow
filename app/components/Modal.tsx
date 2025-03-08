"use client";

import React, { useEffect } from "react";
import styles from "./Modal.module.scss";
import moment from "moment-jalaali"; // If you need date formatting

interface ModalProps {
  coin: {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    last_updated: string;
  };
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ coin, onClose }) => {
  useEffect(() => {
    // Handle Escape key
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  function toShamsiDate(isoDate: string) {
    return moment(isoDate).format("jYYYY/jMM/jDD");
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={`${styles.modal} bg-cream`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="d-flex justify-content-between mb-7">
          <button
            type="button"
            className="btn-close position-absolute top-0 end-0 m-3"
            onClick={onClose}
          ></button>
          <h2 className="montserrat text-green fw-bolder fs-4 ms-4">
            7<span className="text-blue">currencies</span>.
          </h2>
        </div>
        <div className="px-4 w-100">
          <div className="d-flex align-items-center w-100">
            <img
              src={coin.image}
              alt={coin.name}
              width={64}
              height={64}
              className="rounded-circle"
            />
            <div className="fs-5 ms-3 d-flex align-items-center w-100">
              <span className="fw-normal me-1">{coin.name}</span>
              <span className="text-steel-gray fw-bold">
                {coin.symbol.toUpperCase()}
              </span>
              <span className="fw-semibold fs-6 ms-auto">
                Updated: {toShamsiDate(coin.last_updated)}
              </span>
            </div>
          </div>
          <h2 className="mt-3 fw-bold">
            {coin.current_price.toLocaleString()}{" "}
            <span className="text-green">USD</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Modal;
