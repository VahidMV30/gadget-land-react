import { Divider } from "../../components/Divider";
import { UserLastOrder } from "../../components/user/dashboard/UserLastOrder";
import { UserWidgets } from "../../components/user/dashboard/UserWidgets";
import useMetadata from "../../hooks/useMetadata";

const UserDashboardPage = () => {
  useMetadata("داشبورد");

  return (
    <>
      <UserWidgets />

      <Divider />

      <UserLastOrder />
    </>
  );
};

export default UserDashboardPage;
