import React, { useEffect, useState } from "react";
import { FaAngleDown, FaHome } from "react-icons/fa";
import * as IconMap from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";

interface MenuItem {
  title: string;
  icon: string;
  route?: string;
  children: MenuItem[];
}

interface SidebarMobileItemsProps {
  menu: MenuItem;
}

const SidebarMobileItems: React.FC<SidebarMobileItemsProps> = ({ menu }) => {
  const [toggleSubMenu, setToggleSubMenu] = useState(false);
  const [IconComponent, setIconComponent] = useState<any>();

  const [selectItem, setSelectItem] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (menu.route === location.pathname) setSelectItem(true);
    else setSelectItem(false);
  }, [location]);

  const SelectedIcon = (IconMap as any)[menu.icon];

  useEffect(() => {
    setIconComponent(() => SelectedIcon || null);
  }, [SelectedIcon]);

  return (
    <li>
      {menu?.children?.length > 0 ? (
        <a
          onClick={() => setToggleSubMenu(!toggleSubMenu)}
          className="flex items-center mx-2 bg-primary-500 text-white p-2 gap-x-4 relative rounded-lg cursor-pointer group hover:bg-primary-400"
        >
          {IconComponent && (
            <IconComponent size={"16px"} className=" rounded-md" />
          )}
          <span className="whitespace-nowrap text-wrap text-[12px]">
            {menu?.title}
          </span>
          <FaAngleDown
            className={
              toggleSubMenu
                ? "text-main-light absolute left-2 -rotate-90"
                : "text-main-light absolute left-2 rotate-0"
            }
          />
        </a>
      ) : (
        <Link
          to={menu?.route as string}
          className={
            selectItem
              ? "flex items-center p-2 gap-x-1 text-primary-500 relative rounded-lg group"
              : "flex items-center p-2 gap-x-1 relative rounded-lg group"
          }
        >
          {IconComponent && (
            <IconComponent
              size={selectItem ? "22px" : "16px"}
              className={
                selectItem
                  ? "transition-all duration-200 rounded-md text-primary-500"
                  : "transition-all duration-200 rounded-md text-slate-500"
              }
            />
          )}
          <span
            className={
              selectItem
                ? "font-semibold whitespace-nowrap text-primary-500 overflow-hidden text-ellipsis  transition-all duration-200  text-[14px]"
                : "font-semibold whitespace-nowrap text-slate-500 overflow-hidden text-ellipsis transition-all duration-200  text-[11px]"
            }
          >
            {menu?.title}
          </span>
        </Link>
      )}

      {menu?.children?.length > 0 && (
        <ul
          className={
            toggleSubMenu
              ? "py-2 space-y-2 mr-8 mx-2 rounded-md bg-slate-50 visible"
              : "py-2 space-y-2 mr-8 mx-2 rounded-md bg-slate-50 hidden"
          }
        >
          {menu?.children?.map((item, index) => (
            <SidebarMobileItems menu={item} key={index} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default SidebarMobileItems;
