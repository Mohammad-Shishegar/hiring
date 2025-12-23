import Box from "#base/src/components/box";
import Button from "#base/src/components/button";
import Typography from "#base/src/components/typography";
import { useAuth } from "#base/src/helpers/contexts/AuthContext";
import clsx from "clsx";
import { FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { NAV_LINKS } from "src/utils/constants";

const Header = () => {
const {setToken} = useAuth()
const navigate = useNavigate()
const handleLogin  =()=>{
  setToken("token" , {name : "HR"})
  navigate("/dashboard")
}

  return (
    <div
      className={clsx(
        "flex bg-slate-100 items-center justify-center min-h-[64px] py-6 z-[50]"
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
        <div className={clsx("flex items-center justify-center gap-x-5")}>
          <nav className="hidden md:flex space-x-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:underline hover:underline-offset-6 hover:text-emerald-600 font-medium transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div>
          <Button onClick={()=>handleLogin()} className={clsx("bg-green-500 text-white hover:bg-green-700")} size="xl">Login</Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
