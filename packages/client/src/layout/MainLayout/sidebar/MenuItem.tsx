import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { menuDataType } from "./DesktopSidebar";
import * as IconMap from "react-icons/pi";
import Typography from "#base/src/components/typography";

type verticalMenuItem = {
  children?: React.ReactNode;
  className?: string;
  link?: string;
  activeId: string;
  sidebarStatus: string;
  isExternalUrl: boolean;
  item: menuDataType;
  handleParentId: Function;
  handleShowChild: Function;
  handleActiveId: Function;
  handleCloseSidebar: Function;
};

const MenuItem = (props: verticalMenuItem): any => {
  const navigate = useNavigate();
  const [showItem, setShowItem] = useState<boolean>(false);
  const [showWithDelay, setShowWithDelay] = useState<boolean>(false);
  const [IconComponent, setIconComponent] = useState<any>();

  const {
    children,
    className,
    link = "",
    sidebarStatus,
    item,
    isExternalUrl,
    handleShowChild,
    handleParentId,
    handleActiveId,
    handleCloseSidebar,
    activeId,
    ...rest
  } = props;

  //load component from React-icon
  const SelectedIcon = (IconMap as any)[item.icon];

  useEffect(() => {
    setIconComponent(() => SelectedIcon || null);
  }, [SelectedIcon]);

  //set animation for foad menu data
  useEffect(() => {
    let t: any;
    if (sidebarStatus === "action") {
      setShowItem(true);

      t = setInterval(() => {
        setShowWithDelay(true);
      }, 350);
    } else {
      setShowItem(false);
      setShowWithDelay(false);
    }
    return () => clearInterval(t);
  }, [sidebarStatus]);

  //show child if item has child
  const handleChange = (e: React.FormEvent, id: string): void => {
    e.stopPropagation();
    e.preventDefault();
    handleParentId(id);
    handleShowChild();
  };

  return (
    <div className="rounded-md">
      <li
        onClick={(e: React.FormEvent): void => {
          handleCloseSidebar();
          e.stopPropagation();
          e.preventDefault();
        }}
        className={` ${className ? className : ""} 
     
        flex items-center ${
          sidebarStatus === "action" ? "justify-start " : "justify-center"
        } px-5 cursor-pointer py-[5px]`}
        {...rest}
      >
        <div
          onClick={(e) => {
            if (activeId && activeId === item.id) handleActiveId("");
            else {
              handleActiveId(item.id);
            }
            item.hasChild
              ? handleChange(e, item.id)
              : sidebarStatus === "action"
              ? navigate(link)
              : null;
          }}
          className={`flex w-full items-center px-[3px]  justify-start py-2 text-white rounded-md ml-auto
            
            ${sidebarStatus === "action" && "px-[5px]"}

           ${
             activeId === item.id && sidebarStatus === "action" && showWithDelay
               ? "bg-white !text-primary-500"
               : sidebarStatus === "action"
               ? "hover:bg-opacity-40 hover:bg-white"
               : ""
           }`}
        >
          {IconComponent && (
            <IconComponent
              size={"24px"}
              className=" rounded-md"
              onClick={() => {
                if (sidebarStatus === "hidden") handleCloseSidebar();
                if (item.hasChild === false) {
                  handleShowChild();
                  if (link) navigate(link);
                }
              }}
            />
          )}
          {showWithDelay && showItem && sidebarStatus === "action" && (
            <>
              <Link
                to={link && link}
                className={`flex z-5 justify-between  items-center w-full transition-opacity duration-1000 opacity-0 ${
                  showItem ? "opacity-100" : ""
                }`}
                onClick={(e: React.FormEvent) => {
                  if (activeId && activeId === item.id) handleActiveId("");
                  else handleActiveId(item.id);
                  item.hasChild && handleChange(e, item.id);
                }}
              >
                <Typography
                  tag="p"
                  className={`text-white font-bold text-sm text-right mr-[10px] flex-wrap ${
                    activeId === item.id ? "!text-primary-500" : ""
                  }`}
                >
                  {item.title}
                </Typography>
                {item.hasChild === true && (
                  <div className="ml-2 w-[25px] h-[25px] ">
                    <MdOutlineKeyboardArrowLeft
                      type="regular"
                      size="25px"
                      className={`${
                        activeId === item.id ? "text-primary-500" : ""
                      }`}
                    />
                  </div>
                )}
              </Link>
            </>
          )}
        </div>
        <div
          className={`${
            sidebarStatus === "action" && showWithDelay ? "inline" : "hidden"
          }`}
        >
          {item.hasChild ? children && children : ""}
        </div>
      </li>
    </div>
  );
};

export default MenuItem;
