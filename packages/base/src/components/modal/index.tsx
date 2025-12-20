import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { IoIosClose } from "react-icons/io";
import Button from "../button";

type modalVariantType = "error" | "primary" | "secondary" | "black" | "success";

export type modalSizeType =
  | "auto"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "xxl"
  | "xxxl"
  | "full";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  showCloseButton?: boolean;
  className?: string;
  disabled?: boolean;
  size?: modalSizeType;
  variant?: modalVariantType;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title = "title",
  children,
  showCloseButton = true,
  className,
  disabled = false,
  size = "xs",
  variant = "black",
}) => {
  const modalSize = {
    auto: "w-auto",
    xs: "md:w-[26%] w-full",
    sm: "md:w-[40%] w-full",
    md: "md:w-[50%] w-full",
    lg: "md:w-[60%] w-full",
    xl: "md:w-[70%] w-full",
    xxl: "md:w-[80%] w-full",
    xxxl: "md:w-[90%] w-full",
    full: "w-full",
  }[size];

  const modalVariant = {
    primary: "bg-primary-200/50",
    black: "bg-black/50",
    secondary: "bg-secondary-200/50",
    error: "bg-error-200/50",
    success: "bg-success-200/50",
  }[variant];

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="relative z-[999]">
      <div
        className={clsx(
          "fixed inset-0 flex items-center justify-center  backdrop-blur-sm",
          modalVariant
        )}
        onClick={onClose}
      >
        <div
          className={clsx(
            "bg-white max-h-[80vh] overflow-y-auto rounded-xl shadow-lg  p-6 relative animate-scaleIn",
            className,
            modalSize
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {showCloseButton && (
            <Button
              className={clsx(
                "!absolute w-1 h-1 top-2 right-3 text-gray-500 !bg-none  text-xl group"
              )}
              onClick={onClose}
            >
              <IoIosClose
                size={25}
                className={
                  "group-hover:scale-150 transition-all duration-500 ease-in-out"
                }
              />
            </Button>
          )}
          {title && (
            <h2 className={clsx("text-lg font-semibold mb-4")}>{title}</h2>
          )}
          <div
            className={clsx(
              "  overflow-y-auto m-2 p-2 flex justify-center items-center",
              {
                "opacity-40 pointer-events-none": disabled,
              }
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
