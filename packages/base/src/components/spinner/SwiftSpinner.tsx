import clsx from "clsx";
import React from "react";

interface SpinnerProps {
  size?: number;
  label?: string;
  color1?: string;
  color2?: string;
  labelClassName?: string;
}

const SwiftSpinner: React.FC<SpinnerProps> = ({
  size = 30,
  color1 = "border-blue-500",
  color2 = "border-red-500",
  labelClassName = "",
  label = "",
}) => {
  return (
    <div className="flex items-center justify-center w-fit flex-col gap-y-3 ">
      <span
        className={clsx(
          "inline-block rounded-full box-border border-t-[4px]  border-r-[4px] border-r-transparent relative",
          color1
        )}
        style={{
          width: size,
          height: size,
          animation: "rotation 1s linear infinite",
        }}
      >
        <span
          className={clsx(
            "absolute left-0 top-0 rounded-full box-border border-b-[4px]  border-l-[4px] border-l-transparent",
            color2
          )}
          style={{ width: size, height: size }}
        />
        <style>{`
        @keyframes rotation {
            0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
          }
          `}</style>
      </span>
      {label !== "" ? (
        <>
          <p className={labelClassName}>{label}</p>
        </>
      ) : null}
    </div>
  );
};

export default SwiftSpinner;
