import Button from "#base/src/components/button";
import { CustomTooltip } from "#base/src/components/tooltip/CustomTooltip";
import clsx from "clsx";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { MdNotificationsActive } from "react-icons/md";
import UserInfo from "./UserInfo";

const Header = () => {
  const hasNotification = false;
  return (
    <div
      className={clsx(
        "flex bg-slate-100 items-center justify-center min-h-[64px] py-6 px-5 z-[50]"
      )}
    >
      <div className={clsx("w-full flex items-center justify-start")}>
        <UserInfo />
      </div>
      <div className={clsx("w-full flex items-start gap-x-4 justify-end")}>
        <CustomTooltip content={"تنظیمات"}>
          <Button variant="outline">
            <IoSettingsOutline size={20} />{" "}
          </Button>
        </CustomTooltip>
        <CustomTooltip content={"پیام ها"}>
          <Button className={clsx("!bg-transparent group")}>
            {" "}
            <MdNotificationsActive
              size={20}
              className={clsx("group-hover:text-success-500", {
                "text-success-500 animate-ping": hasNotification,
              })}
            />
          </Button>
        </CustomTooltip>
        <CustomTooltip content={"منو"}>
          <Button>
            {" "}
            <AiOutlineMenuUnfold size={20} />{" "}
          </Button>
        </CustomTooltip>
      </div>
    </div>
  );
};

export default Header;
