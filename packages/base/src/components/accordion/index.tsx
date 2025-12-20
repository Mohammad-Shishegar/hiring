import React, { useEffect, useRef, useState } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import clsx from "clsx";
import Typography from "../typography";

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  accordionTitle: React.ReactNode;
  moreItem?: React.ReactNode;
  isOpen?: boolean;
  disabled?: boolean;
  titleColor?: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({
  accordionTitle,
  moreItem,
  isOpen,
  disabled = false,
  titleColor = "text-black",
  children,
  className,
  ...rest
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(!!isOpen);

  useEffect(() => {
    setIsVisible(!!isOpen);
  }, [isOpen]);

  const moreItemClick = useRef<any>(null);

  const handleToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      moreItemClick.current &&
      moreItemClick.current.contains(e.target as Node)
    ) {
      return;
    }

    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    setIsVisible((prev) => !prev);
  };

  return (
    <div className={clsx("w-full", className)} {...rest}>
      <div
        onClick={handleToggle}
        className={clsx(
          "relative flex items-center justify-between gap-x-4 p-4 rounded transition border-2 border-white",
          "bg-slate-300 hover:bg-slate-200",
          {
            "cursor-pointer": !disabled,
            "cursor-not-allowed bg-slate-400 ": disabled,
            "!border-none rounded-b-none text-white": isVisible,
          }
        )}
      >
        <div className="flex items-center gap-x-4 w-full">
          <MdArrowBackIosNew
            className={clsx(
              "transition-transform",
              titleColor,
              isVisible && "-rotate-90 scale-125 duration-200"
            )}
          />
          <div className={clsx("font-semibold", titleColor)}>
            {accordionTitle}
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-5 w-full pl-10">
          <div
            className="flex items-center justify-end gap-x-5"
            ref={moreItemClick}
          >
            {!disabled && moreItem}
          </div>
          <Typography tag="p" className={titleColor}>
            {accordionTitle ?? null}
          </Typography>
        </div>
      </div>
      <div
        className={clsx(
          "overflow-hidden transition-all duration-300",
          isVisible ? "max-h-screen opacity-100 p-4" : "max-h-0 opacity-0"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
