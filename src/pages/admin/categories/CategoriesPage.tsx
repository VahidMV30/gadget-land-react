import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import axios from "axios";
import classnames from "classnames";
import { useState } from "react";
import { FaPenClip, FaPlus } from "react-icons/fa6";
import { HiChevronDoubleLeft, HiChevronDoubleRight, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Link } from "react-router-dom";

import { Spinner } from "../../../components/Spinner";
import { IMAGE_URL } from "../../../constants";
import useFetchAllCategoriesQuery from "../../../hooks/reactQuery/categories/queries/useFetchAllCategoriesQuery";
import useMetadata from "../../../hooks/useMetadata";
import { CategoryResponse } from "../../../types/categoryTypes";

const CategoriesPage = () => {
  useMetadata("دسته بندی ها");
  const { data, isLoading, isError, error } = useFetchAllCategoriesQuery();
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns: ColumnDef<CategoryResponse>[] = [
    {
      accessorKey: "id",
      header: "#",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "name",
      header: "نام دسته بندی",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "slug",
      header: "اسلاگ",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "image",
      header: "عکس",
      cell: (info) => {
        const row = info.row.original;
        return (
          <img src={`${IMAGE_URL}/categories/${info.getValue() as string}`} alt={row.name} className="h-10 w-10" />
        );
      },
    },
    {
      id: "actions",
      header: "عملیات",
      cell: ({ row }) => (
        <Link to={`/admin/categories/update/${row.original.id}`} className="text-yellow-500 dark:text-yellow-300">
          <FaPenClip size={17} />
        </Link>
      ),
    },
  ];

  const table = useReactTable({
    data: data || [],
    columns,
    state: {
      globalFilter,
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <Spinner size={25} />
        <span>در حال بارگذاری ...</span>
      </div>
    );
  }

  if (isError) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data.errors[0]?.description;
      return <p className="text-center text-rose-500">{errorMessage}</p>;
    }
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <Link
          to="/admin/categories/create"
          className="flex items-center gap-1.5 rounded border border-sky-300 bg-sky-500/25 p-2 hover:cursor-pointer hover:bg-sky-500/30 dark:border-sky-700"
        >
          <FaPlus size={17} />
          <span>ایجاد دسته بندی</span>
        </Link>

        <input
          type="text"
          placeholder="جستجو..."
          value={globalFilter}
          className="w-44 rounded border border-gray-300 p-2 outline-none focus:ring-2 md:w-52 dark:border-gray-700"
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <div className="h-[33.1rem] max-h-fit overflow-y-auto">
          <table className="w-full">
            <thead className="text-right">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className="truncate border-y border-gray-300 px-4 py-3 select-none hover:cursor-pointer dark:border-gray-700"
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {data?.length === 0 ? (
                <tr className="odd:bg-gray-100/50 hover:bg-gray-200/50 odd:dark:bg-gray-800/50 dark:hover:bg-gray-700/50">
                  <td colSpan={5} className="animate-pulse truncate px-4 py-3 text-center text-yellow-300">
                    رکوردی یافت نشد!
                  </td>
                </tr>
              ) : (
                <>
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="even:bg-gray-100/50 hover:bg-gray-200/50 even:dark:bg-gray-800/50 dark:hover:bg-gray-700/50"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="truncate px-4 py-1">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className={classnames({
              "cursor-pointer rounded-full bg-teal-500/25 p-1.5 hover:bg-teal-500/30 disabled:cursor-not-allowed": true,
              "hover:text-sky-500 disabled:text-gray-950 disabled:hover:bg-teal-500/25": true,
              "disabled:dark:text-white": true,
            })}
          >
            <HiChevronDoubleRight size={20} />
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className={classnames({
              "cursor-pointer rounded-full bg-teal-500/25 p-1.5 hover:bg-teal-500/30 disabled:cursor-not-allowed": true,
              "hover:text-sky-500 disabled:text-gray-950 disabled:hover:bg-teal-500/25": true,
              "disabled:dark:text-white": true,
            })}
          >
            <HiChevronRight size={20} />
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className={classnames({
              "cursor-pointer rounded-full bg-teal-500/25 p-1.5 hover:bg-teal-500/30 disabled:cursor-not-allowed": true,
              "hover:text-sky-500 disabled:text-gray-950 disabled:hover:bg-teal-500/25": true,
              "disabled:dark:text-white": true,
            })}
          >
            <HiChevronLeft size={20} />
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className={classnames({
              "cursor-pointer rounded-full bg-teal-500/25 p-1.5 hover:bg-teal-500/30 disabled:cursor-not-allowed": true,
              "hover:text-sky-500 disabled:text-gray-950 disabled:hover:bg-teal-500/25": true,
              "disabled:dark:text-white": true,
            })}
          >
            <HiChevronDoubleLeft size={20} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span>نمایش</span>
          <select
            value={pagination.pageSize}
            className="rounded border border-gray-300 p-1 focus:ring-2 focus:outline-none dark:border-gray-700"
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((size) => (
              <option key={size} value={size} className="bg-white hover:cursor-pointer dark:bg-gray-950">
                {size}
              </option>
            ))}
          </select>
          <span>سطر</span>
        </div>

        <p>
          صفحه {table.getState().pagination.pageIndex + 1} از {table.getPageCount()}
        </p>
      </div>
    </>
  );
};

export default CategoriesPage;
