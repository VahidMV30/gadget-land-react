import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import classnames from "classnames";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { LuShoppingCart } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

import { CitySelector } from "../../components/checkout/CitySelector";
import { ProvinceSelector } from "../../components/checkout/ProvinceSelector";
import { FormErrorMessage } from "../../components/FormErrorMessage";
import { Spinner } from "../../components/Spinner";
import useUpdateUserAddressInfoMutation from "../../hooks/reactQuery/users/mutations/useUpdateUserAddressInfoMutation";
import useFetchUserAddressInfoQuery from "../../hooks/reactQuery/users/queries/useFetchUserAddressInfoQuery";
import useMetadata from "../../hooks/useMetadata";
import { updateUserAddressInfoSchema } from "../../schemas/userSchemas";
import { useGlobalStore } from "../../store/globalStore";
import { UpdateUserAddressInfoRequest } from "../../types/userTypes";
import toast from "react-hot-toast";

interface Props {
  onNext: () => void;
}

export const AddressStep = ({ onNext }: Props) => {
  useMetadata("آدرس گیرنده");
  const { data, isLoading, isError, error } = useFetchUserAddressInfoQuery();
  const { mutate, isPending } = useUpdateUserAddressInfoMutation(onNext);
  const { selectedProvinceId, setSelectedProvinceId, selectedCityId, setSelectedCityId } = useGlobalStore();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateUserAddressInfoRequest>({ resolver: zodResolver(updateUserAddressInfoSchema) });
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setSelectedProvinceId(data.provinceId || null);
      setSelectedCityId(data.cityId || null);
    }
  }, [data, setSelectedCityId, setSelectedProvinceId]);

  useEffect(() => {
    if (data) {
      setValue("fullName", data.fullName || "");
      setValue("mobile", data.mobile! || "");
      setValue("postalCode", data.postalCode! || "");
      setValue("address", data.address! || "");
    }
  }, [data, setValue]);

  const onSubmit = (data: UpdateUserAddressInfoRequest) => {
    if (!selectedCityId) return toast.error("لطفا شهر محل سکونت را انتخاب نمایید.");

    mutate({ ...data, cityId: selectedCityId });
  };

  if (isLoading || !data) {
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
    <div className="mx-auto w-full rounded border border-gray-300 p-4 lg:w-[45rem] dark:border-gray-700">
      <h4 className="mb-4 rounded bg-gray-200 p-4 text-center dark:bg-gray-800">آدرس گیرنده</h4>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
        <div className="col-span-2 flex flex-col gap-1">
          <div className="flex flex-col gap-1">
            <label>
              نام و نام خانوادگی <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              {...register("fullName")}
              className={classnames(
                "rounded border border-gray-300 p-2 focus:ring-2 focus:outline-none dark:border-gray-700",
                {
                  "border-rose-500 ring-rose-500 dark:border-rose-500": errors.fullName,
                },
              )}
              disabled={isPending}
            />
          </div>
          <FormErrorMessage error={errors.fullName} className="text-[13px]" />
        </div>

        <div className="col-span-2 flex flex-col gap-1 md:col-span-1">
          <div className="flex flex-col gap-1">
            <label>
              موبایل <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              {...register("mobile", {
                onChange: (e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  setValue("mobile", val);
                },
              })}
              className={classnames(
                "rounded border border-gray-300 p-2 focus:ring-2 focus:outline-none dark:border-gray-700",
                {
                  "border-rose-500 ring-rose-500 dark:border-rose-500": errors.mobile,
                },
              )}
              disabled={isPending}
            />
          </div>
          <FormErrorMessage error={errors.mobile} className="text-[13px]" />
        </div>

        <div className="col-span-2 flex flex-col gap-1 md:col-span-1">
          <div className="flex flex-col gap-1">
            <label>
              کد پستی <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              {...register("postalCode", {
                onChange: (e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  setValue("postalCode", val);
                },
              })}
              className={classnames(
                "rounded border border-gray-300 p-2 focus:ring-2 focus:outline-none dark:border-gray-700",
                {
                  "border-rose-500 ring-rose-500 dark:border-rose-500": errors.postalCode,
                },
              )}
              disabled={isPending}
            />
          </div>
          <FormErrorMessage error={errors.postalCode} className="text-[13px]" />
        </div>

        <div className="col-span-2 flex flex-col gap-1 md:col-span-1">
          <label>
            استان <span className="text-rose-500">*</span>
          </label>
          <ProvinceSelector
            initialSelectedProvince={{ id: data.provinceId!, name: data.provinceName! }}
            disabled={isPending}
          />
        </div>

        <div className="col-span-2 flex flex-col gap-1 md:col-span-1">
          <label>
            شهر <span className="text-rose-500">*</span>
          </label>
          <CitySelector disabled={isPending || !selectedProvinceId} />
        </div>

        <div className="col-span-2 flex flex-col gap-1">
          <div className="flex flex-col gap-1">
            <label>
              آدرس <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              {...register("address")}
              className={classnames(
                "rounded border border-gray-300 p-2 focus:ring-2 focus:outline-none dark:border-gray-700",
                {
                  "border-rose-500 ring-rose-500 dark:border-rose-500": errors.address,
                },
              )}
              disabled={isPending}
            />
          </div>
          <FormErrorMessage error={errors.address} className="text-[13px]" />
        </div>

        <div className="col-span-2 flex items-center justify-between">
          <button
            type="button"
            className={classnames({
              "mt-2 flex items-center justify-center gap-1.5 rounded-tr-2xl rounded-br-2xl text-white": true,
              "bg-blue-600 p-2 hover:cursor-pointer hover:bg-blue-500 disabled:cursor-default": true,
            })}
            onClick={() => navigate("/cart")}
            disabled={isPending}
          >
            <LuShoppingCart size={17} className="mt-0.5" />
            <span>سبد خرید</span>
          </button>

          <button
            type="submit"
            className={classnames({
              "mt-2 flex items-center justify-center gap-1.5 rounded-tl-2xl rounded-bl-2xl text-white": true,
              "bg-blue-600 p-2 hover:cursor-pointer hover:bg-blue-500 disabled:cursor-default": true,
            })}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <span>در حال پردازش</span>
                <Spinner size={17} />
              </>
            ) : (
              <>
                <span>مرحله بعدی</span>
                <FaCircleArrowLeft size={17} className="mt-0.5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
