import useMetadata from "../hooks/useMetadata";

const HomePage = () => {
  useMetadata("صفحه اصلی");

  return <h1>Home Page!</h1>;
};

export default HomePage;
