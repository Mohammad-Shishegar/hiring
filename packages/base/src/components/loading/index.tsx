import React from "react";

interface LoadingProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  color?: string;
  text?: string;
}

const Loading = (props: LoadingProps) => {
  const { className, text = "Loading", size = "md", color, ...rest } = props;

  const dm = {
    xs: 12,
    sm: 24,
    md: 36,
    lg: 48,
    xl: 60,
    xxl: 72,
  }[size];

  const circleColorClassName = color
    ? `stroke-${color} fill-${color}`
    : "stroke-secondary-500 fill-secondary-500";

  return (
    <div
      className={
        className
          ? className
          : "flex flex-col justify-center items-center p-4 w-full"
      }
      role="status"
      {...rest}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={dm}
        height={dm}
        viewBox="0 0 24 24"
      >
        <style>
          {`
            .spinner_S1WN {
              animation: spinner_MGfb .8s linear infinite;
              animation-delay: -.8s;
            }
            .spinner_Km9P {
              animation-delay: -.65s;
            }
            .spinner_JApP {
              animation-delay: -.5s;
            }
            @keyframes spinner_MGfb {
              93.75%, 100% { opacity: .2; }
            }
          `}
        </style>
        <circle
          className={`spinner_S1WN ${circleColorClassName}`}
          cx="4"
          cy="12"
          r="3"
        />
        <circle
          className={`spinner_S1WN spinner_Km9P ${circleColorClassName}`}
          cx="12"
          cy="12"
          r="3"
        />
        <circle
          className={`spinner_S1WN spinner_JApP ${circleColorClassName}`}
          cx="20"
          cy="12"
          r="3"
        />
      </svg>
      <span className="text-secondary-500 text-xs font-medium">{text}...</span>
    </div>
  );
};

export default Loading;
