import axios from "axios";
import type { TooltipItem } from "chart.js";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { Divider } from "../../Divider";
import { Spinner } from "../../Spinner";
import useFetchTopFiveProvincesBySalesOfYearQuery from "../../../hooks/reactQuery/reports/queries/useFetchTopFiveProvincesBySalesOfYearQuery";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "right" as const,
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
        label: function (context: TooltipItem<"doughnut">) {
          const value = context.parsed ?? context.raw;
          return `فروش: ${value.toLocaleString()} تومان`;
        },
      },
    },
  },
};

export const AdminTopProvincesBySales = () => {
  const { data: reportData, isLoading, isError, error } = useFetchTopFiveProvincesBySalesOfYearQuery();

  const labels = reportData?.map((item) => item.province);
  const values = reportData?.map((item) => item.sales);

  const data = {
    labels,
    datasets: [
      {
        label: " ",
        data: values,
        backgroundColor: [
          "oklch(72.3% 0.219 149.579)",
          "oklch(62.3% 0.214 259.815)",
          "oklch(79.5% 0.184 86.047)",
          "oklch(62.7% 0.265 303.9)",
          "oklch(64.5% 0.246 16.439)",
        ],
        borderWidth: 1,
      },
    ],
  };

  if (isLoading) {
    return (
      <div className="rounded-lg border border-gray-300 p-4 dark:border-gray-700">
        <h4 className="rounded-lg bg-slate-300 p-2 text-center dark:bg-slate-700">5 استان برتر</h4>
        <Divider />
        <div className="flex flex-col items-center justify-center gap-2">
          <Spinner size={25} />
          <span>در حال بارگذاری ...</span>
        </div>
      </div>
    );
  }

  if (isError && axios.isAxiosError(error)) {
    const errorMessage = error.response?.data.errors[0]?.description;
    return (
      <div className="rounded-lg border border-gray-300 p-4 dark:border-gray-700">
        <h4 className="rounded-lg bg-slate-300 p-2 text-center dark:bg-slate-700">5 استان برتر</h4>
        <Divider />
        <p className="text-center text-rose-500">{errorMessage}</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-300 p-4 dark:border-gray-700">
      <h4 className="rounded-lg bg-slate-300 p-2 text-center dark:bg-slate-700">5 استان برتر</h4>
      <Divider />
      <div className="relative w-full md:h-[200px]">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};
