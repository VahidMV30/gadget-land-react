import { FieldError } from "react-hook-form";

interface Props {
  error: FieldError | undefined;
}

export const FormErrorMessage = ({ error }: Props) => {
  if (!error) return null;

  return <span className="text-[12px] text-rose-500">{error.message}</span>;
};
