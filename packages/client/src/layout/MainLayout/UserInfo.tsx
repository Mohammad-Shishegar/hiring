import Typography from "#base/src/components/typography";
import clsx from "clsx"
import { FcBusinessman } from "react-icons/fc";

const UserInfo = () => {
  return (
    <div className={clsx("min-w-10 flex items-center justify-center gap-x-3 rounded-md border-2 border-stone-400 p-3")}>
        <Typography tag="span">محمد شیشه گر</Typography>
        <FcBusinessman size={30}/>
    </div>
  )  
}

export default UserInfo