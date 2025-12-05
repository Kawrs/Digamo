"use client";
import React from "react";
import { FaColumns, FaBookOpen, FaCalendarAlt, FaRandom } from "react-icons/fa";

type TabItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

type Props = {
  tabs?: TabItem[];
  activeId?: string;
  onChange?: (id: string) => void;
  className?: string;
};

const defaultTabs: TabItem[] = [
  { id: "pantry", label: "My Pantry", icon: <FaColumns size={16} /> },
  { id: "recipes", label: "Recipes", icon: <FaBookOpen size={16} /> },
  // { id: "mealplan", label: "Meal Plan", icon: <FaCalendarAlt size={16} /> },
  // { id: "surprise", label: "Surprise Me", icon: <FaRandom size={16} /> },
];

export default function Tabs({
  tabs = defaultTabs,
  activeId,
  onChange,
  className = "",
}: Props) {
  const [selected, setSelected] = React.useState<string>(
    activeId ?? tabs[0].id
  );

  React.useEffect(() => {
    if (activeId) setSelected(activeId);
  }, [activeId]);

  function handleSelect(id: string) {
    setSelected(id);
    onChange?.(id);
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="w-full px-3 mt-25">
        <div className="max-w-7xl h-10 mx-auto grid grid-cols-2 gap-0 bg-gray-100/70 rounded-lg overflow-hidden">
          {tabs.map((t) => {
            const isActive = selected === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleSelect(t.id)}
                className={`w-full  flex items-center justify-center gap-3 transition-colors duration-150 text-sm ${
                  isActive
                    ? "bg-white text-gray-900 shadow-sm rounded-lg "
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-50 hover:cursor-pointer rounded-lg"
                }`}
              >
                <span className="text-base flex-shrink-0">{t.icon}</span>
                <span className="truncate">{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
