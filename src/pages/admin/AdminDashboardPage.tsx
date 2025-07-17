import { AdminSalesByMonth } from "../../components/admin/dashboard/AdminSalesByMonth";
import { AdminTopCitiesBySales } from "../../components/admin/dashboard/AdminTopCitiesBySales";
import { AdminTopProvincesBySales } from "../../components/admin/dashboard/AdminTopProvincesBySales";
import { AdminWidgets } from "../../components/admin/dashboard/AdminWidgets";
import { Divider } from "../../components/Divider";
import useMetadata from "../../hooks/useMetadata";

const AdminDashboardPage = () => {
  useMetadata("داشبورد");

  return (
    <div>
      <AdminWidgets />

      <Divider className="my-8" />

      <AdminSalesByMonth />

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="col-span-2 md:col-span-1">
          <AdminTopCitiesBySales />
        </div>

        <div className="col-span-2 md:col-span-1">
          <AdminTopProvincesBySales />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
