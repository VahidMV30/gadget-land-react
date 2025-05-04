import { ImSpinner9 } from "react-icons/im";

type Props = {
  size?: number;
};

export const Spinner = ({ size = 17 }: Props) => {
  return <ImSpinner9 size={size} className="animate-spin" />;
};
