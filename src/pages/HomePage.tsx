import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex items-center gap-8">
      <Link to="/auth/login">Login</Link>
      <Link to="/auth/register">Register</Link>
      <Link to="/dashboard">User Dashboard</Link>
      <Link to="/admin/dashboard">Admin Dashboard</Link>
    </div>
  );
};

export default HomePage;
