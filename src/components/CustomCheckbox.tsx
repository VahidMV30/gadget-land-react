import classnames from "classnames";
import { FaCheck } from "react-icons/fa6";

interface Props {
  label: string;
  className: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const CustomCheckbox = ({ label, className, checked, onChange }: Props) => {
  return (
    <label className="flex cursor-pointer items-center gap-2">
      <input type="checkbox" className="sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />

      <div
        className={classnames(
          {
            "flex h-5 w-5 items-center justify-center rounded border select-none": true,
            "border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800": !checked,
          },

          checked && className,
        )}
      >
        {checked && <FaCheck size={15} className="text-white" />}
      </div>
      {label && <span className="text-[13.5px] select-none">{label}</span>}
    </label>
  );
};
