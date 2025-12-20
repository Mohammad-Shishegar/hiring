import React from "react";

interface AccordionDetailsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const AccordionDetails: React.FC<AccordionDetailsProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div className={`p-5${className ? className : ""}`} {...rest}>
      {children}
    </div>
  );
};

export default AccordionDetails;
