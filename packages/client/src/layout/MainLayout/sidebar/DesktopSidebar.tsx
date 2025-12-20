import { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import MainMenu from "./MainMenu";
import { data, useLocation } from "react-router-dom";
import { useGet } from "#base/src/helpers/api/useGet";

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

const DesktopSidebar = (): any => {
  const [sidebarStatus, setSidebarStatus] = useState<string>("hidden");

  //check for Run handleData Function
  const [isHandleDataRun, setIsHandleDataRun] = useState<boolean>(false);

  //use for Outside Click
  const ref = useRef(null);

  const location = useLocation();

  //when the path changed Menu status must change to close(hidden)
  useEffect(() => {
    setSidebarStatus("hidden");
  }, [location.pathname]);

  const handleClickOutside = () => {
    setSidebarStatus("hidden");
  };
  // useOnClickOutside(ref, handleClickOutside);

  //backend menu Api
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

  const dataFake: any[] = [
    {
      id: "95411a54-a5f1-4fb5-ba74-172c46aa70a8",
      title: "خانه",
      name: "Manage frequently asked questions",
      documentId: null,
      description: null,
      menuType: "Page",
      menuTypeId: null,
      menuTypeName: null,
      route: "/Mohammad",
      routeName: "خانه",
      formID: null,
      formTitle: null,
      baseUrl: null,
      externalUrl: null,
      url: null,
      pageId: null,
      menuId: "22777837-d603-46c7-aeff-d8afbbceae91",
      parentId: null,
      parentTitle: null,
      isActive: true,
      isOpen: false,
      ownerId: null,
      menuName: "Top Menu",
      priority: 1,
      icon: "home",
      menuTitle: "منو سمت راست",
      pageEnTitle: null,
      pageTitle: null,
      pageRoute: null,
      pageIsSystem: null,
      languageName: null,
      documentName: null,
      documentMimeType: null,
      documentExtension: null,
      userPersonnelCode: null,
      userAvatar: null,
      userFullName: " ",
      children: [
        {
          id: "99641705-fcsfb-48ac-8f72-a293150f7a8d",
          title: "سوالات جدید",
          name: "News",
          documentId: null,
          description: null,
          menuType: "Page",
          menuTypeId: null,
          menuTypeName: null,
          route: "/Home2",
          routeName: "سوالات متداول",
          formID: null,
          formTitle: null,
          baseUrl: null,
          externalUrl: null,
          url: null,
          pageId: null,
          menuId: "22777837-d603-46c7-aeff-d8afbbceae91",
          parentId: null,
          parentTitle: null,
          isActive: true,
          isOpen: false,
          ownerId: null,
          menuName: "Top Menu",
          priority: 3,
          icon: "circle-question",
          menuTitle: "منو سمت راست",
          pageEnTitle: null,
          pageTitle: null,
          pageRoute: null,
          pageIsSystem: null,
          languageName: null,
          documentName: null,
          documentMimeType: null,
          documentExtension: null,
          userPersonnelCode: null,
          userAvatar: null,
          userFullName: " ",
          children: [
            {
              id: "b579d5a5-6acad-4731-9989-bc16d18605eb",
              title: "فیش حقوقی",
              name: "Management of frequently asked questions",
              documentId: null,
              description: null,
              menuType: "Page",
              menuTypeId: null,
              menuTypeName: null,
              route: "/static/wsp/fishes",
              routeName: "فیش حقوقی",
              formID: null,
              formTitle: null,
              baseUrl: null,
              externalUrl: null,
              url: null,
              pageId: null,
              menuId: "22777837-d603-46c7-aeff-d8afbbceae91",
              parentId: null,
              parentTitle: null,
              isActive: true,
              isOpen: false,
              ownerId: null,
              menuName: "Top Menu",
              priority: 5,
              icon: "hand-holding-dollar",
              menuTitle: "منو سمت راست",
              pageEnTitle: null,
              pageTitle: null,
              pageRoute: null,
              pageIsSystem: null,
              languageName: null,
              documentName: null,
              documentMimeType: null,
              documentExtension: null,
              userPersonnelCode: null,
              userAvatar: null,
              userFullName: " ",
              children: [],
              claimChildren: [],
            },
          ],
        },
      ],
    },
    {
      id: "99641705-fcfb-48ac-8f72-a293150f7a8d",
      title: "سوالات متداول",
      name: "News",
      documentId: null,
      description: null,
      menuType: "Page",
      menuTypeId: null,
      menuTypeName: null,
      route: "/Home2",
      routeName: "سوالات متداول",
      formID: null,
      formTitle: null,
      baseUrl: null,
      externalUrl: null,
      url: null,
      pageId: null,
      menuId: "22777837-d603-46c7-aeff-d8afbbceae91",
      parentId: null,
      parentTitle: null,
      isActive: true,
      isOpen: false,
      ownerId: null,
      menuName: "Top Menu",
      priority: 3,
      icon: "circle-question",
      menuTitle: "منو سمت راست",
      pageEnTitle: null,
      pageTitle: null,
      pageRoute: null,
      pageIsSystem: null,
      languageName: null,
      documentName: null,
      documentMimeType: null,
      documentExtension: null,
      userPersonnelCode: null,
      userAvatar: null,
      userFullName: " ",
      children: [],
    },
    {
      id: "bdf7640c-c1a0-4886-ab14-8441243a47d8",
      title: "پروفایل حرفه ای من",
      name: "Management of news categories",
      documentId: null,
      description: null,
      menuType: "Page",
      menuTypeId: null,
      menuTypeName: null,
      route: "/static/ojc/my-eligibility-profile",
      routeName: "پروفایل حرفه ای من",
      formID: null,
      formTitle: null,
      baseUrl: null,
      externalUrl: null,
      url: null,
      pageId: null,
      menuId: "22777837-d603-46c7-aeff-d8afbbceae91",
      parentId: null,
      parentTitle: null,
      isActive: true,
      isOpen: false,
      ownerId: null,
      menuName: "Top Menu",
      priority: 4,
      icon: "memo-pad",
      menuTitle: "منو سمت راست",
      pageEnTitle: null,
      pageTitle: null,
      pageRoute: null,
      pageIsSystem: null,
      languageName: null,
      documentName: null,
      documentMimeType: null,
      documentExtension: null,
      userPersonnelCode: null,
      userAvatar: null,
      userFullName: " ",
      children: [
        {
          id: "99641705-fcfb-48ac-8f72-a2923150f7a8d",
          title: "سوالات متداول",
          name: "News",
          documentId: null,
          description: null,
          menuType: "Page",
          menuTypeId: null,
          menuTypeName: null,
          route: "/Home2",
          routeName: "سوالات متداول",
          formID: null,
          formTitle: null,
          baseUrl: null,
          externalUrl: null,
          url: null,
          pageId: null,
          menuId: "22777837-d603-46c7-aeff-d8afbbceae91",
          parentId: null,
          parentTitle: null,
          isActive: true,
          isOpen: false,
          ownerId: null,
          menuName: "Top Menu",
          priority: 3,
          icon: "circle-question",
          menuTitle: "منو سمت راست",
          pageEnTitle: null,
          pageTitle: null,
          pageRoute: null,
          pageIsSystem: null,
          languageName: null,
          documentName: null,
          documentMimeType: null,
          documentExtension: null,
          userPersonnelCode: null,
          userAvatar: null,
          userFullName: " ",
          children: [],
        },
      ],
    },
    {
      id: "b579d5a5-6aca-4731-9989-bc16d18605eb",
      title: "فیش حقوقی",
      name: "Management of frequently asked questions",
      documentId: null,
      description: null,
      menuType: "Page",
      menuTypeId: null,
      menuTypeName: null,
      route: "/static/wsp/fishes",
      routeName: "فیش حقوقی",
      formID: null,
      formTitle: null,
      baseUrl: null,
      externalUrl: null,
      url: null,
      pageId: null,
      menuId: "22777837-d603-46c7-aeff-d8afbbceae91",
      parentId: null,
      parentTitle: null,
      isActive: true,
      isOpen: false,
      ownerId: null,
      menuName: "Top Menu",
      priority: 5,
      icon: "hand-holding-dollar",
      menuTitle: "منو سمت راست",
      pageEnTitle: null,
      pageTitle: null,
      pageRoute: null,
      pageIsSystem: null,
      languageName: null,
      documentName: null,
      documentMimeType: null,
      documentExtension: null,
      userPersonnelCode: null,
      userAvatar: null,
      userFullName: " ",
      children: [],
      claimChildren: [],
    },
    {
      id: "c18e530d-a569-4710-b9f9-c22f47de18ed",
      title: "پیشنهادات و انتقادات",
      name: "Management of organizational units",
      documentId: null,
      description: null,
      menuType: "Page",
      menuTypeId: null,
      menuTypeName: null,
      route: "/static/suggestion",
      routeName: "پیشنهادات و انتقادات",
      formID: null,
      formTitle: null,
      baseUrl: null,
      externalUrl: null,
      url: null,
      pageId: null,
      menuId: "22777837-d603-46c7-aeff-d8afbbceae91",
      parentId: null,
      parentTitle: null,
      isActive: true,
      isOpen: false,
      ownerId: null,
      menuName: "Top Menu",
      priority: 6,
      icon: "users",
      menuTitle: "منو سمت راست",
      pageEnTitle: null,
      pageTitle: null,
      pageRoute: null,
      pageIsSystem: null,
      languageName: null,
      documentName: null,
      documentMimeType: null,
      documentExtension: null,
      userPersonnelCode: null,
      userAvatar: null,
      userFullName: " ",
      children: [
        {
          id: "b579d5a5-6aca-4731-9989-bc16ud18605eb",
          title: "فیش حقوقی",
          name: "Management of frequently asked questions",
          documentId: null,
          description: null,
          menuType: "Page",
          menuTypeId: null,
          menuTypeName: null,
          route: "/static/wsp/fishes",
          routeName: "فیش حقوقی",
          formID: null,
          formTitle: null,
          baseUrl: null,
          externalUrl: null,
          url: null,
          pageId: null,
          menuId: "22777837-d603-46c7-aeff-d8afbbceae91",
          parentId: null,
          parentTitle: null,
          isActive: true,
          isOpen: false,
          ownerId: null,
          menuName: "Top Menu",
          priority: 5,
          icon: "hand-holding-dollar",
          menuTitle: "منو سمت راست",
          pageEnTitle: null,
          pageTitle: null,
          pageRoute: null,
          pageIsSystem: null,
          languageName: null,
          documentName: null,
          documentMimeType: null,
          documentExtension: null,
          userPersonnelCode: null,
          userAvatar: null,
          userFullName: " ",
          children: [],
          claimChildren: [],
        },
      ],
      claimChildren: [],
    },
  ];

  //change Menu Status
  const handleCloseSidebar = (): void =>
    setSidebarStatus(sidebarStatus === "hidden" ? "action" : "hidden");

  const [customData, setCustomData] = useState<menuDataType[]>([]);

  // in this function Converting a multi-dimensional array to a one-dimensional array and
  // set some new prop in to new array (layerCount-hasChild-pID)
  // our new array is customData
  let layerCount: number = 1;
  const handleData = (data: any, pID: string = "0") => {
    for (let i = 0; i < data?.length; i++) {
      data[i] = { ...data?.[i], pID: pID };
      if (data?.[i].children.length > 0) {
        data[i] = { ...data?.[i], layer: layerCount, hasChild: true };
        layerCount++;
        handleData(data?.[i]?.children, data?.[i]?.id);
        layerCount--;
      } else {
        data[i] = {
          ...data?.[i],
          layer: layerCount,
          hasChild: false,
        };
      }
      setCustomData((cv: any) => [...cv, data?.[i]]);
    }
  };

  useEffect(() => {
    if (menuData) handleData(menuData);
    setIsHandleDataRun(true);
  }, [menuData]);

  //delete duplicate item in our new array
  useEffect(() => {
    if (customData) {
      const temp: any = Array.from(
        new Map(
          customData.map((item: menuDataType) => [item.id, item])
        ).values()
      );
      setCustomData(temp);
    }
  }, [isHandleDataRun]);

  return (
    <div className="relative max-lg:hidden z-[100]" ref={ref}>
      <div
        className={`fixed  transition-width duration-500 right-0 top-[412px] min-h-[405px] !max-h-auto h-auto -translate-y-1/2 items-center
           rounded-l-xl bg-primary-500 ${
             sidebarStatus === "action" ? "w-[280px]" : "w-[70px]"
           }`}
        onClick={() => handleCloseSidebar()}
      >
        <div
          className={`fixed flex items-center justify-center shadow-md transition-all shad rounded-full bg-white text-primary-500 duration-500 w-[27px] h-[27px] bg-text-primary opacity-100 ${
            sidebarStatus === "hidden"
              ? "right-[23px] top-[-18px]"
              : "right-[260px] top-[-18px] "
          }`}
          onClick={() => handleCloseSidebar()}
        >
          {sidebarStatus === "hidden" ? (
            <IoIosArrowBack
              size={"22px"}
              className=" cursor-pointer  pr-[2px]"
              color="red"
            />
          ) : (
            <IoIosArrowForward
              size={"22px"}
              className=" cursor-pointer  pr-[2px]"
              color="red"
            />
          )}
        </div>
        <div
          className={` items-center 
            rounded-md
            
            ${sidebarStatus === "action" ? "w-[280px]" : "w-[80px]"}`}
        >
          <MainMenu
            sidebarStatus={sidebarStatus}
            // data={customData ? customData : []}
            data={dataFake}
            handleCloseSidebar={handleCloseSidebar}
          />
        </div>
      </div>
    </div>
  );
};

export default DesktopSidebar;
