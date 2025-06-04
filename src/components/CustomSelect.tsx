import { useState } from "react";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import classnames from "classnames";

interface Props {
  items: { title: string; value: number }[];
  selected: { title: string; value: number } | null;
  onSelect: (title: string, value: number) => void;
  disabled: boolean;
}

export const CustomSelect = ({ items, selected, onSelect, disabled }: Props) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        className={classnames({
          "flex w-full cursor-pointer items-center justify-between rounded border": true,
          "border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-800": true,
          "disabled:cursor-default": true,
        })}
        disabled={disabled}
        onClick={() => setOpen(!isOpen)}
      >
        {selected !== null ? (
          <span>{items.find((x) => x.value === selected.value)?.title}</span>
        ) : (
          <span>لطفا انتخاب نمایید 🤔</span>
        )}
        {isOpen ? <LuChevronUp size={17} /> : <LuChevronDown size={17} />}
      </button>
      {isOpen && (
        <ul className="absolute mt-1 h-60 w-full overflow-y-scroll rounded border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800">
          {items.map((item) => (
            <li key={item.value}>
              <button
                className="w-full cursor-pointer p-2 text-right hover:bg-sky-500/25"
                onClick={() => {
                  setOpen(false);
                  onSelect(item.title, item.value);
                }}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
