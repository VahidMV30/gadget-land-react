import { FaLocationDot } from "react-icons/fa6";

import { UserAddressInfoResponse } from "../../../types/userTypes";

interface Props {
  address: UserAddressInfoResponse;
}

export const AddressSummary = ({ address }: Props) => {
  return (
    <div className="rounded p-4">
      <h4 className="flex items-center justify-center gap-1.5 rounded bg-gray-200 p-4 text-center dark:bg-gray-800">
        <FaLocationDot size={17} />
        <span>آدرس گیرنده</span>
      </h4>

      <div className="grid grid-cols-2 gap-4 pt-4">
        <p className="col-span-2 md:col-span-1">نام و نام خانوادگی : {address.fullName}</p>
        <p className="col-span-2 md:col-span-1">ایمیل : {address.email}</p>
        <p className="col-span-2 md:col-span-1">موبایل : {address.mobile}</p>
        <p className="col-span-2 md:col-span-1">استان : {address.provinceName}</p>
        <p className="col-span-2 md:col-span-1">شهر : {address.cityName}</p>
        <p className="col-span-2 md:col-span-1">کد پستی : {address.postalCode}</p>
        <p className="col-span-2 text-justify">آدرس : {address.address}</p>
      </div>
    </div>
  );
};
