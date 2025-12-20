import useGet from "#base/hooks/useGet";
import Tooltip from "#components/tooltip";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import SidebarMobileItems from "./SidebarMobileItems";
import { useLocation } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";


interface MenuItem {
  id: string;
  title: string;
  route: string;
  icon: string;
  children: MenuItem[];
}

export type menuDataType = {
  id: string;
  title: string;
  name: string;
  route: string;
  layer: number;
  pID: string;
  routeName: string;
  icon: string;
  hasChild: boolean;
  formID?: string | null;
  menuType?: string;
  children: menuDataType[];
};

type serverMenuDataType = {
  id: string;
  title: string;
  name: string;
  route: string;
  routeName: string;
  menuId: string;
  parentId: string;
  isActive: boolean;
  icon: string;
  menuTitle: string;
  children: serverMenuDataType[];
};

const SidebarMobile = (props:any) => {
  
  const {toggleMobileSidebar=false, setToggleMobileSidebar=()=>{}} = props;
  const location = useLocation();

  const GET_ALL_POINT = "Core/Menus/GetAll";
  const GET_MENU_ITEM = "Core/MenuItems/GetCurrentUserByMenuId";

  const { data: allMenu } = useGet(GET_ALL_POINT, ["menu"]);

  const [menuDataId, setMenuDataId] = useState<string>();
  const [menuData, setMenuData] = useState<serverMenuDataType[]>();

  const api = GET_MENU_ITEM + `/?menuId=${menuDataId}`;
  const { refetch } = useGet(api, ["right-menu-data"], false);

  useEffect((): void => {
    var data = allMenu?.data?.items?.filter(
      (item: any) => item.name === "Right Menu"
    );
    setMenuDataId(data?.[0] && data?.[0]?.id);
  }, [allMenu]);

  useEffect((): void => {
    const getdata = async () => {
      var response;
      if (menuDataId && !menuData) response = await refetch();
      if (response) setMenuData(response?.data?.data);
    };
    getdata();
  }, [menuDataId]);

  useEffect(() => {
    setToggleMobileSidebar(false);
  }, [location]);

  return (
    <div className="hidden max-lg:inline">
      <div 
        onClick={() => {
          setToggleMobileSidebar(!toggleMobileSidebar);
        }}
        className={
          toggleMobileSidebar
            ? "bg-black opacity-50 fixed top-0 visible right-0 left-0 bottom-0 z-[250]"
            : "bg-black opacity-50 fixed top-0 hidden right-0 left-0 bottom-0 z-[250]"
        }
      />
      <aside
        className={
          toggleMobileSidebar
            ? "fixed h-screen bg-white transform-none opacity-100  transition-transform duration-500 flex inset-y-0 z-[300]"
            : "fixed h-screen bg-white translate-x-full  transition-transform duration-500 flex inset-y-0 z-[300]"
        }
      >
        <div className="flex flex-col relative text-main-light bg-main-primary box-border gap-y-2 p-3 w-[300px]">
          <div
            onClick={() => setToggleMobileSidebar(false)}
            className={
              "absolute top-2 left-4 bg-main-light h-[40px] w-[40px] flex justify-center items-center rounded-full"
            }
          >
            <Tooltip content={"بستن منو"} position="left">
              <IoClose
                size={"25px"}
                className="text-primary-500 cursor-pointer"
              />
            </Tooltip>
          </div>
          <div className="flex justify-center items-center py-2 gap-2 border-b-[1px] border-b-white mb-2 flex-col sm:flex-row"></div>
          <ul className={`space-y-3 h-[90vh] overflow-auto`}>
            {menuData?.map((item: MenuItem, index: number) => (
              <SidebarMobileItems menu={item} key={index} />
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default SidebarMobile;
