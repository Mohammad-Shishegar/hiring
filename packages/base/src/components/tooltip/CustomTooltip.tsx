import * as Tooltip from "@radix-ui/react-tooltip";
import clsx from "clsx";

export const CustomTooltip = ({
  children,
  content,
  side = "top",
  delayToShow = 100,
  className,
}: {
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
  side?: "bottom" | "left" | "top" | "right";
  delayToShow?: number;
}) => (
  <Tooltip.Provider delayDuration={delayToShow}>
    <Tooltip.Root>
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side={side}
          className={clsx(
            "bg-gray-800 z-[10000000] text-white text-sm px-3 py-1 rounded shadow",
            className
          )}
          sideOffset={5}
        >
          {content}
          <Tooltip.Arrow className="fill-gray-800" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  </Tooltip.Provider>
);
