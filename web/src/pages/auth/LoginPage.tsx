import { HttpError, useLogin } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Link } from "react-router-dom";

import { useEffect } from "react";

type LoginVariables = {
  email: string;
  password: string;
};

export const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<LoginVariables, HttpError, LoginVariables>({
    refineCoreProps: {
      meta: {
        ignoreResourceWrapper: true,
      }
    }
  });

  const { mutate: login, isLoading } = useLogin<LoginVariables>();

  const onSubmit = async (values: LoginVariables) => {
    login(values, {
      onSettled: (data, error) => {
        console.log(data, error)
        if (!data) {
          setError("root", {
            type: "api",
            message: error?.message || "An error occurred",
          });
        }
        if (data && data.error) {
          setError("root", {
            type: "api",
            message: data.error.message || "An error occurred",
          });
        }
      }
    });
  };

  useEffect(() => {
    console.log(errors)
  }, [errors]);

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="flex flex-col">
        {errors.root && (
          <p className="text-red-500 text-sm">{errors.root.message}</p>
        )}
        <form onSubmit={(e) => {
          e.preventDefault();
          clearErrors();
          handleSubmit(onSubmit)();
        }} className="mt-1">
          <fieldset disabled={isLoading} className="w-full flex flex-col gap-2 items-center">
            <fieldset>
              <input
                {...register("email", {
                  required: true,
                })}
                className="input input-bordered w-full max-w-xs"
                type="text"
                placeholder="Email"
              />
              {errors.email && (
                <ul className="text-sm text-red-500 mt-1">
                  <li>This field is required</li>
                </ul>
              )}
            </fieldset>
            <fieldset>
              <input
                {...register("password", {
                  required: true,
                })}
                className="input input-bordered w-full max-w-xs"
                type="password"
                placeholder="Password"
                autoComplete=""
              />
              {errors.password && (
                <ul className="text-sm text-red-500 mt-1">
                  <li>This field is required</li>
                </ul>
              )}
            </fieldset>
            <button
              type="submit"
              className="btn btn-md w-full btn-wide btn-primary"
            >
              Submit
            </button>
          </fieldset>
        </form>
        <div className="flex flex-row justify-between mt-1">
          <Link to="/auth/signup" className="text-sm text-primary">
            Sign up
          </Link>
          <Link to="/forgot-password" className="text-sm text-primary">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};