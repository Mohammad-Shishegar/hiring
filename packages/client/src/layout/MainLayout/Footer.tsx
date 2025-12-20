import Typography from "#base/src/components/typography"
import clsx from "clsx"

const Footer = () =>{
    return (
        <div className={clsx("flex h-[64px] bg-slate-200 items-center justify-center")}>
            <Typography tag="h2" className="flex gap-x-2">
                Design By 
                <Typography tag="h1" className="font-bold">Mohammad Shishegar</Typography>
            </Typography>
        </div>
    )
}

export default Footer