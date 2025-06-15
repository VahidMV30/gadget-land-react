import { useEffect, useState } from "react";
import classnames from "classnames";
import axios from "axios";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

import useFetchCitiesByProvinceIdQuery from "../../hooks/reactQuery/cities/queries/useFetchCitiesByProvinceIdQuery";
import { CityResponse } from "../../types/cityTypes";
import { useGlobalStore } from "../../store/globalStore";
import { Spinner } from "../Spinner";

export const CitySelector = ({ disabled }: { disabled: boolean }) => {
  const { data, isLoading, isError, error } = useFetchCitiesByProvinceIdQuery();
  const { selectedCityId, setSelectedCityId } = useGlobalStore();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<CityResponse | null>(null);

  useEffect(() => {
    if (data) {
      const currentCity = data.find((x) => x.id === selectedCityId)!;
      setSelectedCity(currentCity);
    }
  }, [data, selectedCityId]);

  const filteredOptions = data?.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (item: CityResponse) => {
    setSelectedCity(item);
    setSelectedCityId(item.id);
    setIsOpen(false);
    setQuery("");
  };

  if (isLoading) {
    return (
      <button
        type="button"
        className={classnames({
          "flex w-full items-center justify-between rounded border border-gray-300": true,
          "bg-white p-2 text-right dark:border-gray-700 dark:bg-gray-800": true,
        })}
        disabled={true}
      >
        <span>انتخاب شهر</span>
        <Spinner size={17} />
      </button>
    );
  }

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
        disabled={disabled}
      >
        <span>{selectedCity?.name || "انتخاب شهر"}</span>
        <span>{isOpen ? <HiChevronUp size={17} /> : <HiChevronDown size={17} />}</span>
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
