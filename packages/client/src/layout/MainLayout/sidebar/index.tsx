import React from "react";

interface SidebarProps {
  children?: React.ReactNode;
}

const Sidebar = (props: SidebarProps) => {
  const { children } = props;
  return (
    <div className="flex flex-col justify-center items-center">{children}</div>
  );
};

export default Sidebar;
