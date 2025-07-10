import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import classnames from "classnames";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaUserGear, FaUserPen } from "react-icons/fa6";

import { FormErrorMessage } from "../../components/FormErrorMessage";
import { Spinner } from "../../components/Spinner";
import { CitySelector } from "../../components/checkout/address/CitySelector";
import { ProvinceSelector } from "../../components/checkout/address/ProvinceSelector";
import { useUpdateUserInfoMutation } from "../../hooks/reactQuery/users/mutations/useUpdateUserInfoMutation";
import useFetchUserDetailsQuery from "../../hooks/reactQuery/users/queries/useFetchUserDetailsQuery";
import useMetadata from "../../hooks/useMetadata";
import { updateUserAddressInfoSchema } from "../../schemas/userSchemas";
import { useGlobalStore } from "../../store/globalStore";
import { UpdateUserAddressInfoRequest } from "../../types/userTypes";
import { useAuthStore } from "../../store/authStore";

const UserDetailsPage = () => {
  useMetadata("اطلاعات کاربری");
  const { data, isLoading, isError, error } = useFetchUserDetailsQuery();
  const { mutate, isPending } = useUpdateUserInfoMutation();
  const { selectedProvinceId, setSelectedProvinceId, selectedCityId, setSelectedCityId } = useGlobalStore();
  const { setUserFullName } = useAuthStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateUserAddressInfoRequest>({ resolver: zodResolver(updateUserAddressInfoSchema) });

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
    setUserFullName(data.fullName);
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
    <>
      <div className="mx-auto w-full rounded">
        <h4 className="mb-4 flex items-center justify-between rounded bg-gray-200 p-4 text-center dark:bg-gray-800">
          <div className="flex items-center gap-1.5">
            <FaUserGear size={17} />
            <span className="mt-0.5">اطلاعات کاربری</span>
          </div>
          <div className="text-sm">
            <span>تاریخ ثبت نام : </span>
            <span className="text-purple-500 dark:text-purple-300">{data.registerDate}</span>
          </div>
        </h4>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
          <div className="col-span-2 flex flex-col gap-1 md:col-span-1">
            <div className="flex flex-col gap-1">
              <label>
                ایمیل<span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={data.email}
                className="rounded border border-gray-300 p-2 dark:border-gray-700"
                disabled={true}
              />
            </div>
          </div>

          <div className="col-span-2 flex flex-col gap-1 md:col-span-1">
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
              initialSelectedProvince={{ id: data.provinceId!, name: data.province! }}
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

          <button
            className={classnames({
              "flex items-center justify-center gap-1.5 rounded border border-sky-300 bg-sky-500/25": true,
              "p-2 hover:cursor-pointer hover:bg-sky-500/30 dark:border-sky-700": true,
              "col-span-2 disabled:cursor-default disabled:hover:bg-sky-500/25": true,
            })}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Spinner size={17} />
                <span>در حال پردازش</span>
              </>
            ) : (
              <>
                <FaUserPen size={17} />
                <span>ذخیره تغییرات</span>
              </>
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default UserDetailsPage;
