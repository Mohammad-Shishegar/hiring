interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    className?: string;
    bold?: boolean;
    tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span";
    size?: "xs" | "sm" | "base" | "lg" | "xl" | "xxl";
    variant?: "white" | "gray" | "danger" | "black" | "null" | "primary" | "success";
}
declare const Typography: (props: TypographyProps) => import("react/jsx-runtime").JSX.Element;
export default Typography;
