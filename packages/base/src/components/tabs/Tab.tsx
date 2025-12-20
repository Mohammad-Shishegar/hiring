import React, { useState } from "react";
import clsx from "clsx";

export interface TabItem {
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: TabItem[];
  defaultIndex?: number;
  className?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  contentClassName?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultIndex = 0,
  className,
  tabClassName,
  activeTabClassName,
  contentClassName,
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <div className={clsx("w-full", className)}>
      <div className="flex border-b w-fit gap-2 bg-green-400 rounded-3xl">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => !tab.disabled && setActiveIndex(index)}
            className={clsx(
              "px-4 py-2 rounded-t transition-all",
              tabClassName,
              {
                "bg-gray-200 font-semibold": activeIndex === index,
                "cursor-not-allowed opacity-55 text-gray-400": tab.disabled,
                [activeTabClassName ?? ""]: activeIndex === index,
              }
            )}
            disabled={tab.disabled}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        className={clsx("p-4 border w-full mt-5 rounded-b", contentClassName)}
      >
        {tabs[activeIndex]?.content}
      </div>
    </div>
  );
};
