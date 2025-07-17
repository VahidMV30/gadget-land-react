import axios from "axios";
import type { TooltipItem } from "chart.js";
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip } from "chart.js";
import { Line } from "react-chartjs-2";

import useFetchSalesByPersianMonthOfYearQuery from "../../../hooks/reactQuery/reports/queries/useFetchSalesByPersianMonthOfYearQuery";
import { Divider } from "../../Divider";
import { Spinner } from "../../Spinner";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        font: {
          family: "IRANYekanXFaNum",
          size: 14.5,
        },
        color: "oklch(55.1% 0.027 264.364)",
      },
    },
    tooltip: {
      enabled: true,
      backgroundColor: "oklch(37.2% 0.044 257.287)",
      titleFont: {
        family: "IRANYekanXFaNum",
        size: 14,
      },
      bodyFont: {
        family: "IRANYekanXFaNum",
        size: 13,
      },
      titleColor: "#fff",
      bodyColor: "#fff",
      padding: 10,
      callbacks: {
        label: function (context: TooltipItem<"line">) {
          const value = context.parsed.y ?? context.raw;
          return `فروش: ${value.toLocaleString()} تومان`;
        },
      },
    },
  },
  scales: {
    x: {
      ticks: {
        font: {
          family: "IRANYekanXFaNum",
          size: 14.5,
        },
        color: "oklch(55.1% 0.027 264.364)",
      },
      grid: {
        color: "oklch(55.1% 0.027 264.364)",
      },
    },
    y: {
      ticks: {
        font: {
          family: "IRANYekanXFaNum",
          size: 14.5,
        },
        color: "oklch(55.1% 0.027 264.364)",
      },
      grid: {
        color: "oklch(55.1% 0.027 264.364)",
      },
    },
  },
};

export const AdminSalesByMonth = () => {
  const { data: reportData, isLoading, isError, error } = useFetchSalesByPersianMonthOfYearQuery();

  const defaultLabels = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];
  const defaultData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  const data = {
    labels: reportData?.map((item) => item.persianMonthName) || defaultLabels,
    datasets: [
      {
        label: "فروش ماهانه",
        data: reportData?.map((item) => item.sales) || defaultData,
        borderColor: "oklch(64.5% 0.246 16.439)",
        tension: 0.4,
        pointBackgroundColor: "oklch(90.5% 0.182 98.111)",
        pointBorderColor: "oklch(90.5% 0.182 98.111)",
      },
    ],
  };

  if (isLoading) {
    return (
      <div className="rounded-lg border border-gray-300 p-4 dark:border-gray-700">
        <h4 className="text-center">نمودار فروش ماهانه</h4>

        <Divider />

        <div className="flex flex-col items-center justify-center gap-2">
          <Spinner size={25} />
          <span>در حال بارگذاری ...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data.errors[0]?.description;
      return (
        <div className="rounded-lg border border-gray-300 p-4 dark:border-gray-700">
          <h4 className="text-center">نمودار فروش ماهانه</h4>

          <Divider />

          <p className="text-center text-rose-500">{errorMessage}</p>
        </div>
      );
    }
  }

  return (
    <div className="rounded-lg border border-gray-300 p-4 dark:border-gray-700">
      <h4 className="text-center">نمودار فروش ماهانه</h4>

      <Divider />

      <div className="relative h-[275px] w-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};
