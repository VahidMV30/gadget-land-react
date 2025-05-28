import axios from "axios";
import classnames from "classnames";
import { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

import { Spinner } from "../../Spinner";
import { CategoryResponse } from "../../../types/categoryTypes";

interface Props {
  title: string;
  initialSelectedItem?: { id: number; name: string };
  data: CategoryResponse[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  disabled: boolean;
  onSelect: (id: number) => void;
}

export const CategorySearchSelect = ({
  title,
  initialSelectedItem,
  data,
  isLoading,
  isError,
  error,
  disabled,
  onSelect,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<{ id: number; name: string } | null>(
    initialSelectedItem ? initialSelectedItem : null,
  );

  const filteredOptions = data?.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (item: { id: number; name: string } | null) => {
    setSelectedItem(item);
    onSelect(item!.id);
    setIsOpen(false);
    setQuery("");
  };

  if (isError) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data.errors[0]?.description;
      return (
        <button
          type="button"
          className={classnames({
            "flex w-full items-center rounded border border-gray-300 text-rose-500": true,
            "bg-white p-2 dark:border-gray-700 dark:bg-gray-800": true,
          })}
        >
          {errorMessage}
        </button>
      );
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={classnames({
          "flex w-full cursor-pointer items-center justify-between rounded border border-gray-300": true,
          "bg-white p-2 text-right disabled:cursor-default dark:border-gray-700 dark:bg-gray-800": true,
        })}
        disabled={isLoading || disabled}
      >
        <span>{selectedItem?.name || title}</span>
        {isLoading ? (
          <Spinner size={17} />
        ) : (
          <span>{isOpen ? <HiChevronUp size={17} /> : <HiChevronDown size={17} />}</span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 z-10 mt-1 w-full rounded border border-gray-300 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
          <input
            type="text"
            placeholder="جستجو..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border-b border-gray-300 px-4 py-2 outline-none dark:border-gray-700"
            autoFocus
          />
          <ul className="max-h-48 overflow-y-auto">
            {filteredOptions!.length > 0 ? (
              filteredOptions!.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className="cursor-pointer px-4 py-2 hover:bg-sky-500/25"
                >
                  {item.name}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-yellow-500 dark:text-yellow-300">موردی یافت نشد!</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
