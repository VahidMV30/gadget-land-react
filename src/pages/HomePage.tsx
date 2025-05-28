import { Link } from "react-router-dom";

import useMetadata from "../hooks/useMetadata";

const HomePage = () => {
  useMetadata("صفحه اصلی");

  return (
    <div>
      <Link to="/products">Products</Link>
    </div>
  );
};

export default HomePage;
