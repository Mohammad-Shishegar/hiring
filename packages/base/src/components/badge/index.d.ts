import React from "react";
interface BadgeProps extends React.HTMLAttributes<HTMLElement> {
    variant: "gray" | "primary" | "danger" | "null" | "white" | "black" | "success" | "secondary";
    onClick: () => void;
    children: React.ReactNode;
}
declare const Badge: (props: BadgeProps) => import("react/jsx-runtime").JSX.Element;
export default Badge;
