import { useState } from "react";
import classnames from "classnames";
import { FaChevronDown } from "react-icons/fa6";
import useChangeOrderStatusByIdMutation from "../../../hooks/reactQuery/orders/mutations/useChangeOrderStatusByIdMutation";

const items = [
  { value: 0, label: "⏳ در انتظار بررسی", status: "Pending" },
  { value: 1, label: "⚙️ در حال پردازش", status: "Processing" },
  { value: 2, label: "🚚 ارسال شد", status: "Shipped" },
];

interface Props {
  orderId: number;
  currentStatus: "Pending" | "Processing" | "Shipped";
}

export const OrderStatusSelector = ({ orderId, currentStatus }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(() =>
    currentStatus === "Pending" ? items[0] : currentStatus === "Processing" ? items[1] : items[2],
  );
  const { mutate } = useChangeOrderStatusByIdMutation();

  return (
    <div className="relative w-44">
      <button
        className="flex w-full items-center justify-between rounded bg-neutral-200 p-2 hover:cursor-pointer dark:bg-neutral-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected.label}</span>
        <FaChevronDown
          size={12}
          className={classnames({
            "duration-150": true,
            "rotate-180": isOpen,
          })}
        />
      </button>

      <div
        className={classnames({
          "absolute mt-1 w-full rounded bg-neutral-200 dark:bg-neutral-700": true,
          hidden: !isOpen,
        })}
      >
        {items.map((item) => (
          <button
            key={item.value}
            className="w-full rounded px-2 py-1 text-right hover:cursor-pointer hover:bg-teal-500/50"
            onClick={() => {
              setSelected(item);
              setIsOpen(false);
              if (currentStatus != item.status) mutate({ orderId: orderId, orderStatus: item.value });
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};
