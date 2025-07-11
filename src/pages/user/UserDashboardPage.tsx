import useLogoutMutation from "../../hooks/reactQuery/auth/mutations/useLogoutMutation";
import useMetadata from "../../hooks/useMetadata";

const UserDashboardPage = () => {
  useMetadata("داشبورد");
  const { mutate } = useLogoutMutation();

  return <div onClick={() => mutate()}>User Dashboard Page!</div>;
};

export default UserDashboardPage;
