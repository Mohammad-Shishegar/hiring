import React from "react";

type verticalMenuType = {
  className?: string;
  children: React.ReactNode;
  handleCloseSidebar?: Function;
};

const VerticalMenu = (props: verticalMenuType) => {
  const { className, children, handleCloseSidebar = () => {}, ...rest } = props;

  return (
    <ul
      onClick={e => {
        handleCloseSidebar();
        e.stopPropagation();
      }}
      className={` mt-[10px] ${
        className ? className : ""
      } h-[400px] overflow-y-auto `}
      // } min-h-[400px] max-h-[550px] overflow-y-auto `}
      {...rest}
    >
      {children}
    </ul>
  );
};

export default VerticalMenu;
