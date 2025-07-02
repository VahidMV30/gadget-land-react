import { FaLocationDot, FaClipboardList, FaCircleCheck } from "react-icons/fa6";
import classNames from "classnames";

interface Props {
  currentStep: number;
  isSuccess?: boolean; // ← اضافه کردن prop جدید
}

export const Stepper = ({ currentStep, isSuccess }: Props) => {
  const steps = [
    { icon: <FaLocationDot size={20} />, label: "آدرس گیرنده" },
    { icon: <FaClipboardList size={20} />, label: "مرور سفارش" },
    { icon: <FaCircleCheck size={20} />, label: "پایان سفارش" },
  ];

  return (
    <div className="relative top-6 mx-auto my-10 flex max-w-xl items-center justify-between">
      <div className="absolute top-5 right-0 left-0 z-0 h-0.5 bg-gray-300 dark:bg-gray-700" />

      {steps.map((step, index) => {
        const status = index < currentStep ? "done" : index === currentStep ? "current" : "pending";

        const isLastStep = index === steps.length - 1;

        const circleClass = classNames("flex h-10 w-10 items-center justify-center rounded-full border", {
          "border-teal-300 bg-teal-100 text-teal-600": status === "done" && (!isLastStep || isSuccess),
          "border-blue-300 bg-blue-100 text-blue-600": status === "current" && (!isLastStep || isSuccess === undefined),
          "border-gray-300 bg-gray-100 text-gray-600": status === "pending",
          "border-rose-300 bg-rose-100 text-rose-600": isLastStep && isSuccess === false,
          "!border-teal-300 !bg-teal-100 !text-teal-600": isLastStep && isSuccess === true,
        });

        return (
          <div key={index} className="relative z-10 flex flex-1 flex-col items-center">
            <div className={circleClass}>{step.icon}</div>
            <div className="mt-2 text-xs font-semibold text-gray-400">{step.label}</div>
          </div>
        );
      })}
    </div>
  );
};
