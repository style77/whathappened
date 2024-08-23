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
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-[url(../bg5.png)] bg-cover custom-bg before:content-[''] before:bg-transparent before:bg-repeat before:bg-[length:182px] before:opacity-[0.12] before:top-[0] before:left-[0] before:absolute before:h-full before:w-full">
      <div className="absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] w-72 h-72 rounded-full blur-[150px] bg-cyan-500 z-0"></div>
      <div className="relative rounded-lg bg-black/80 w-[calc(25%-2rem)] overflow-hidden shadow-sm border border-white/10">
        <div className="relative p-12 custom-bg before:content-[''] before:bg-transparent before:bg-repeat before:bg-[length:182px] before:opacity-[0.12] before:top-[0] before:left-[0] before:absolute before:h-full before:w-full before:rounded-lg">
          <div className="flex flex-col relative">
            <h1 className="text-white font-light text-2xl">Sign in</h1>
            <p className="text-white/75 font-light text-sm mb-6">Please sign in using your credentials.</p>
            {errors.root && (
              <p className="text-red-500 text-sm">{errors.root.message}</p>
            )}
            <form onSubmit={(e) => {
              e.preventDefault();
              clearErrors();
              handleSubmit(onSubmit)();
            }} className="mt-1 z-[10]">
              <fieldset disabled={isLoading} className="w-full flex flex-col gap-3 items-center">
                <fieldset className="w-full">
                  <input
                    {...register("email", {
                      required: true,
                    })}
                    className="input bg-white/10 border border-white/15 w-full focus:outline-none"
                    type="text"
                    placeholder="Email"
                  />
                  {errors.email && (
                    <ul className="text-sm text-red-500 mt-1">
                      <li>This field is required</li>
                    </ul>
                  )}
                </fieldset>
                <fieldset className="w-full">
                  <input
                    {...register("password", {
                      required: true,
                    })}
                    className="input bg-white/10 border border-white/15 w-full focus:outline-none"
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
                <Link to="/forgot-password" className="text-xs font-extralight text-white/75 text-start w-full">
                  Forgot Password
                </Link>
                <button
                  type="submit"
                  className="btn w-full bg-white text-black !border-white mt-4"
                >
                  Sign in
                </button>
                <div className="divider after:bg-white/15 before:bg-white/15 text-white !gap-2 font-extralight">or</div>
                <div className="flex flex-row gap-4 items-center justify-center">
                  <button className="btn w-min bg-white/15 font-normal text-white fill-white border-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 50 50"
                      className="shrink-0 size-5"
                    >
                      <path d="M25.996 48C13.313 48 2.992 37.684 2.992 25S13.312 2 25.996 2a22.954 22.954 0 0115.492 5.996l.774.707-7.586 7.586-.703-.602a12.277 12.277 0 00-7.977-2.957c-6.766 0-12.273 5.504-12.273 12.27s5.507 12.27 12.273 12.27c4.879 0 8.734-2.493 10.55-6.739h-11.55V20.176l22.55.031.169.793c1.176 5.582.234 13.793-4.531 19.668C39.238 45.531 33.457 48 25.996 48z"></path>
                    </svg>
                  </button>
                  <button className="btn w-min bg-white/15 font-normal text-white border-0">
                    <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
      <span className="text-white/75 mt-2 text-sm">You don't have an account?<Link to="/auth/signup" className="pl-1 text-white">Sign up!</Link></span>
    </div>
  );
};