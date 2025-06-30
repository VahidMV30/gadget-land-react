import useLogoutMutation from "../../hooks/reactQuery/auth/mutations/useLogoutMutation";

const UserDashboardPage = () => {
  const { mutate } = useLogoutMutation();

  return <div onClick={() => mutate()}>User Dashboard Page!</div>;
};

export default UserDashboardPage;
