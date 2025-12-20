import { useEffect, useState } from "react";
import ChildMenu from "./ChildMenu";
import MenuItem from "./MenuItem";
import VerticalMenu from "./VerticalMenu";

import { menuDataType } from "./DesktopSidebar";

type mainMenuType = {
  className?: string;
  listItemClassName?: string;
  sidebarStatus: string;
  data: menuDataType[];
  handleCloseSidebar: Function;
};

const MainMenu = (props: mainMenuType) => {
  const {
    className,
    listItemClassName,
    data,
    sidebarStatus,
    handleCloseSidebar,
    ...rest
  } = props;

  const [mainData, setmainData] = useState<menuDataType[]>([]);
  const [parentId, setParentId] = useState<string>("");
  const [childData, setChildData] = useState<menuDataType[]>([]);
  const [showChild, setShowChild] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<string>("");
  const [distance, setDistance] = useState<string>("");

  useEffect(() => {
    console.log(mainData);
  }, [mainData]);

  const handleParentId = (id: string) => {
    setParentId(id);
  };

  const handleActiveId = (activeId: string) => {
    setActiveId(activeId);
  };

  //handle distance of child layer
  const handleDistance = (temp: menuDataType[]) => {
    if (temp)
      switch (temp?.[0]?.layer) {
        case 1:
          setDistance("right-[300px]");
          break;
        case 2:
          setDistance("right-[570px]");
          break;
        case 3:
          setDistance("right-[855px]");
          break;
        case 4:
          setDistance("right-[1140px]");
          break;
        case 5:
          setDistance("right-[1425px]");
          break;
        case 6:
          setDistance("right-[1710px]");
          break;
        case 7:
          setDistance("right-[1995px]");
          break;
      }
  };

  const handleShowChild = () => setShowChild((cv: boolean) => !cv);

  //find child of each item in menu for handle child data
  useEffect(() => {
    if (parentId !== "") {
      let temp = [];
      for (var i = 0; i < data.length; i++) {
        if (data[i].pID === parentId) temp.push(data[i]);
      }
      setChildData(temp);
    }
  }, [parentId]);

  //find item of main layer i menu (item with pID=0)
  useEffect(() => {
    var temp = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i].pID === "0") temp.push(data[i]);
    }
    setmainData(temp);
    handleDistance(temp);
  }, [data]);

  //find active item for change style and handle child layer
  useEffect(() => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === activeId)
        if (data[i].hasChild === true) setShowChild(true);
    }
  }, [activeId]);

  return (
    <VerticalMenu
      className={className && className}
      {...rest}
      handleCloseSidebar={handleCloseSidebar}
    >
      {mainData?.length > 0
        ? mainData.map((item, index) => (
            <MenuItem
              className={listItemClassName && listItemClassName}
              item={item}
              key={item.id}
              activeId={activeId}
              isExternalUrl={item.menuType === "ExternalUrl"}
              sidebarStatus={sidebarStatus}
              handleParentId={handleParentId}
              handleShowChild={handleShowChild}
              handleActiveId={handleActiveId}
              handleCloseSidebar={handleCloseSidebar}
              link={
                item?.formID
                  ? !item?.hasChild
                    ? "/forms/" + item?.formID
                    : ""
                  : !item?.hasChild
                  ? item?.route
                  : ""
              }
            >
              {childData ? (
                <div
                  className={`w-[280px] min-h-[400px] rounded-xl fixed top-[-0px] transition-all
                   cursor-default duration-150  bg-white shadow-md
                  
                  ${distance} ${showChild ? "inline" : "hidden"}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <ChildMenu
                    key={item?.id}
                    sidebarStatus={"action"}
                    data={childData}
                    mainData={data}
                    handleCloseSidebar={handleCloseSidebar}
                  />
                </div>
              ) : null}
            </MenuItem>
          ))
        : null}
    </VerticalMenu>
  );
};

export default MainMenu;
