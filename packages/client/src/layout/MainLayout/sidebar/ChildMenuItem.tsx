import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { menuDataType } from "./DesktopSidebar";
import * as IconMap from "react-icons/pi";
import Typography from "#base/src/components/typography";

type ChildMenuItemType = {
  children?: React.ReactNode;
  className?: string;
  link?: string | null;
  activeId: string;
  sidebarStatus: string;
  isExternalUrl: boolean;
  item: menuDataType;
  handleParentId: Function;
  handleShowChild: Function;
  handleActiveId: Function;
  handleCloseSidebar: Function;
};

const ChildMenuItem = (props: ChildMenuItemType) => {
  const [IconComponent, setIconComponent] = useState<any>();

  const navigate = useNavigate();

  const {
    children,
    className,
    link = "",
    sidebarStatus,
    item,
    isExternalUrl,
    handleShowChild,
    handleParentId,
    handleCloseSidebar,
    handleActiveId,
    activeId,
    ...rest
  } = props;

  useEffect((): void => {
    if (sidebarStatus === "default") {
    }
  }, [sidebarStatus]);

  const handleChange = (e: React.FormEvent, id: string): void => {
    e.stopPropagation();
    e.preventDefault();
    handleParentId(id);
    handleShowChild();
  };

  //load component from React-icon
  const SelectedIcon = (IconMap as any)[item.icon];

  useEffect(() => {
    setIconComponent(() => SelectedIcon || null);
  }, [SelectedIcon]);

  return (
    <>
      <li
        onClick={(e: React.FormEvent): void => {
          handleCloseSidebar();
          e.stopPropagation();
          e.preventDefault();
        }}
        className={` ${className ? className : ""}  
        flex items-center ${
          sidebarStatus === "action" ? "justify-start " : "justify-center"
        } px-5 cursor-pointer py-[5px]  
          `}
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
              ? link && navigate(link)
              : null;
          }}
          className={`flex  px-[5px] w-full items-center justify-center py-2 text-primary-500 rounded-md
          ${
            activeId === item.id
              ? "bg-red-700 !text-white"
              : "hover:bg-opacity-40 hover:bg-primary-200"
          }`}
        >
          {IconComponent && (
            <IconComponent
              size="24px"
              className=" rounded-md"
              onClick={() => {
                if (item.hasChild === false) {
                  handleShowChild();
                  if (link) navigate(link);
                }
              }}
            />
          )}
          {sidebarStatus === "action" && (
            <>
              <Link
                to={link ?? ""}
                className="flex z-20 justify-between items-center w-full"
                onClick={(e: React.FormEvent) => {
                  if (activeId && activeId === item.id) handleActiveId("");
                  else handleActiveId(item.id);
                  item.hasChild && handleChange(e, item.id);
                }}
              >
                <Typography
                  tag="p"
                  className={`text-red-700  text-sm mr-[10px] text-right flex-wrap ${
                    activeId === item.id ? "!text-white" : ""
                  }`}
                >
                  {item.title}
                </Typography>
                {item.hasChild === true && (
                  <>
                    <div className="ml-2 w-[25px] h-[25px]">
                      <MdOutlineKeyboardArrowLeft
                        type="regular"
                        size="25px"
                        className={`${
                          activeId === item.id ? "text-white" : ""
                        }`}
                      />
                    </div>
                  </>
                )}
              </Link>
            </>
          )}
        </div>
        <div className={`${sidebarStatus === "action" ? "inline" : "hidden"}`}>
          {children && children}
        </div>
      </li>
    </>
  );
};

export default ChildMenuItem;
