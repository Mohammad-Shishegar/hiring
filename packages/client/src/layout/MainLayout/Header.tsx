import Button from "#base/src/components/button";
import { CustomTooltip } from "#base/src/components/tooltip/CustomTooltip";
import clsx from "clsx";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { MdNotificationsActive } from "react-icons/md";
import UserInfo from "./UserInfo";
import Box from "#base/src/components/box";
import { FaUserPlus } from "react-icons/fa";
import Typography from "#base/src/components/typography";
import { NavLink } from "react-router-dom";

const Header = () => {
  const hasNotification = false;
  return (
    <div
      className={clsx(
        "flex bg-slate-100 items-center justify-center min-h-[64px] py-6 px-5 z-[50]"
      )}
    >
      <div
        className={clsx(
          "mx-auto w-full max-w-7xl px-5 flex items-center justify-between"
        )}
      >
        <div className={clsx("flex  items-center justify-center gap-x-3")}>
          <Box
            className={clsx(
              "bg-gradient-to-r from-green-500 to-green-800 w-10 h-10 rounded flex items-center justify-center"
            )}
          >
            <FaUserPlus size={20} className={clsx("text-white")} />
          </Box>
          <Typography tag="span" className={clsx("text-[16px] font-bold")}>
            جاب تلنت
          </Typography>
        </div>
        <div>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-500"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-500"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-500"
            }
          >
            Dashboard
          </NavLink>
        </div>
        <div>
          <Button>Login</Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
