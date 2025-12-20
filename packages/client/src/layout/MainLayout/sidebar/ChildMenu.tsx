import { useEffect, useState } from "react";
import ChildMenuItem from "./ChildMenuItem";
import { menuDataType } from "./DesktopSidebar";
import VerticalMenu from "./VerticalMenu";

type childMenuType = {
  className?: string;
  listItemClassName?: string;
  data: menuDataType[];
  sidebarStatus: string;
  handleCloseSidebar: Function;
  mainData: menuDataType[];
};

const ChildMenu = (props: childMenuType) => {
  const {
    className,
    listItemClassName,
    data,
    sidebarStatus,
    handleCloseSidebar,
    mainData,
    ...rest
  } = props;

  const [parentId, setParentId] = useState<string>("");
  const [childData, setChildData] = useState<menuDataType[]>([]);
  const [showChild, setShowChild] = useState<boolean>(false);
  const [distance, setDistance] = useState<string>("");
  const [activeId, setActiveId] = useState<string>("");

  const handleParentId = (id: string): void => {
    setParentId(id);
  };

  const handleActiveId = (activeId: string): void => {
    setActiveId(activeId);
  };

  //handle distance of child layer
  const handleDistance = (temp: menuDataType[]): void => {
    if (temp)
      switch (temp[0].layer) {
        case 1:
          setDistance("right-[0px]");
          break;
        case 2:
          setDistance("right-[300px]");
          break;
        case 3:
          setDistance("right-[585px]");
          break;
        case 4:
          setDistance("right-[870px]");
          break;
        case 5:
          setDistance("right-[1155px]");
          break;
        case 6:
          setDistance("right-[1440px]");
          break;
        case 7:
          setDistance("right-[1725px]");
          break;
      }
  };

  const handleShowChild = (): void => setShowChild((cv: any) => !cv);

  //find child of each item in menu for handle child data
  useEffect((): void => {
    if (parentId !== "") {
      let temp = [];
      for (var i = 0; i < mainData.length; i++) {
        if (mainData[i].pID === parentId) temp.push(mainData[i]);
      }
      setChildData(temp);
      handleDistance(temp);
    }
  }, [parentId]);

  //find active item for change style and handle child layer
  useEffect(() => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === activeId)
        if (data[i].hasChild === true) setShowChild(true);
    }
  }, [activeId]);

  return (
    <VerticalMenu
      handleCloseSidebar={handleCloseSidebar}
      className={className && className}
      {...rest}
    >
      {data?.length > 0
        ? data.map((item: menuDataType, index: any) => (
            <ChildMenuItem
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
                    ? "/forms/" + item.formID
                    : null
                  : !item?.hasChild
                  ? item?.route
                  : null
              }
            >
              {item?.children?.length > 0 && item?.children[0]?.pID === activeId ? (
                <div
                  className={`w-[280px] min-h-[400px] rounded-xl fixed top-[-0px] transition-all cursor-default
                   duration-150 bg-white shadow-md  
                   
                   ${distance} 
                  ${showChild ? "inline" : "hidden"}`}
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <ChildMenu
                    sidebarStatus={"action"}
                    handleCloseSidebar={handleCloseSidebar}
                    data={childData}
                    mainData={mainData}
                  />
                </div>
              ) : null}
            </ChildMenuItem>
          ))
        : null}
    </VerticalMenu>
  );
};

export default ChildMenu;
