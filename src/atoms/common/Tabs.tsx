import React, { useEffect, useRef, useState } from 'react';

interface TabsProps {
  tabs: { label: string; route: string }[]; // Array of objects with label and route
  activeTab: string;
  onTabChange: (tab: { label: string; route: string }) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  const [underlineStyle, setUnderlineStyle] = useState<React.CSSProperties>({});
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const activeIndex = tabs.findIndex(
      (tab) => tab.label.toLocaleLowerCase() === activeTab
    );
    const activeTabRef = tabRefs.current[activeIndex];

    if (activeTabRef) {
      setUnderlineStyle({
        width: `${activeTabRef.offsetWidth}px`,
        transform: `translateX(${activeTabRef.offsetLeft}px)`,
      });
    }
  }, [activeTab, tabs]);

  return (
    <div className="relative mx-auto mt-4 w-[90vw] px-4 md:w-full md:p-0">
      <div className="scrollbar-hide flex w-full flex-row gap-2 overflow-x-auto whitespace-nowrap pb-4 md:pb-0 lg:gap-4">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            ref={(el) => (tabRefs.current[index] = el)}
            onClick={() => onTabChange(tab)}
            className={`relative min-w-max p-2 text-sm lg:text-base ${activeTab === tab.label.toLocaleLowerCase() ? 'font-bold text-black' : 'text-gray-500'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <span
        style={underlineStyle}
        className="transition-all duration-300 lg:absolute lg:bottom-0 lg:left-0 lg:h-1 lg:bg-black"
      />
      <hr className="border-black" />
    </div>
  );
};

export default Tabs;
