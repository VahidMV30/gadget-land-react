import { FieldError } from "react-hook-form";

interface Props {
  error: FieldError | undefined;
  className: string;
}

export const FormErrorMessage = ({ error, className }: Props) => {
  if (!error) return null;

  return <span className={`text-rose-500 ${className}`}>{error.message}</span>;
};
