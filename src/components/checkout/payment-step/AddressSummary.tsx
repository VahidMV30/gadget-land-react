import { UserAddressInfoResponse } from "../../../types/userTypes";

interface Props {
  address: UserAddressInfoResponse;
}

export const AddressSummary = ({ address }: Props) => {
  return (
    <div className="rounded p-4">
      <h4 className="rounded bg-gray-200 p-4 text-center dark:bg-gray-800">🗺️ آدرس گیرنده</h4>

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
