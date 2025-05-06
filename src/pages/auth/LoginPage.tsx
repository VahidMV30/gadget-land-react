import { zodResolver } from "@hookform/resolvers/zod";
import classnames from "classnames";
import { useForm } from "react-hook-form";
import { LuKey, LuLogIn, LuMail } from "react-icons/lu";
import { Link } from "react-router-dom";

import { Divider } from "../../components/Divider";
import { FormErrorMessage } from "../../components/FormErrorMessage";
import { Spinner } from "../../components/Spinner";
import useLoginMutation from "../../hooks/reactQuery/auth/mutations/useLoginMutation";
import useMetadata from "../../hooks/useMetadata";
import { loginSchema } from "../../schemas/authSchemas";
import { LoginType } from "../../types/authTypes";

const LoginPage = () => {
  useMetadata("ورود");
  const { mutate, isPending } = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data: LoginType) => {
    mutate(data);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-[30rem] rounded border border-gray-300 p-4 dark:border-gray-700">
        <h4 className="rounded bg-sky-100 p-4 text-center dark:bg-sky-950">ورود به حساب کاربری</h4>

        <Divider />

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <div className="relative">
              <input
                type="text"
                placeholder="ایمیل"
                {...register("email")}
                className={classnames(
                  "w-full rounded border border-gray-300 p-2 pr-10 outline-none focus:ring-2 dark:border-gray-700",
                  {
                    "border-rose-500 ring-rose-500 dark:border-rose-500": errors.email,
                  },
                )}
                disabled={isPending}
              />
              <LuMail size={17} className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500" />
            </div>
            <FormErrorMessage error={errors.email} />
          </div>

          <div className="flex flex-col gap-1">
            <div className="relative">
              <input
                type="password"
                placeholder="گذرواژه"
                {...register("password")}
                className={classnames(
                  "w-full rounded border border-gray-300 p-2 pr-10 outline-none focus:ring-2 dark:border-gray-700",
                  {
                    "border-rose-500 ring-rose-500 dark:border-rose-500": errors.password,
                  },
                )}
                disabled={isPending}
              />
              <LuKey size={17} className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500" />
            </div>
            <FormErrorMessage error={errors.password} />
          </div>

          <button
            className={classnames({
              "flex items-center justify-center gap-1.5 rounded border border-teal-300 bg-teal-500/25": true,
              "p-2 hover:cursor-pointer hover:bg-teal-500/30 dark:border-teal-700": true,
              "disabled:cursor-default disabled:hover:bg-teal-500/25": true,
            })}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Spinner />
                <span>ورود</span>
              </>
            ) : (
              <>
                <LuLogIn size={17} />
                <span>ورود</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-4 flex items-center gap-2 text-sm">
          <span>حساب کاربری ندارید؟</span>
          <Link to="/auth/register" className="text-sky-500">
            ثبت نام
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
