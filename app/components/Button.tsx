import React from "react";

const Button = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <button
      className={`${className?.includes("border") ? "" : "border-0"} ${
        className?.includes("bg") ? "" : "bg-blue"
      } text-background px-5 fw-bolder rounded-32 py-3 fs-6 ${className} `}
    >
      {children}
    </button>
  );
};

export default Button;
