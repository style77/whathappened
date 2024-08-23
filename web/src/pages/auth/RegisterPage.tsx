import { HttpError, useLogin, useRegister } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Link } from "react-router-dom";

import { useEffect } from "react";

type RegisterVariables = {
    email: string;
    password: string;
    confirmPassword: string;
};

export const Register: React.FC = () => {
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm<RegisterVariables, HttpError, RegisterVariables>({
        refineCoreProps: {
            meta: {
                ignoreResourceWrapper: true,
            }
        },
    });

    const { mutate: registerUser, isLoading } = useRegister<RegisterVariables>();
    const { mutate: login } = useLogin<{
        email: string;
        password: string;
    }>();

    const onSubmit = async (values: RegisterVariables) => {
        registerUser(values, {
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
            },
            onSuccess: (data) => {
                if (!data.success) return

                login({
                    email: values.email,
                    password: values.password,
                }, {
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
                        <h1 className="text-white font-light text-2xl">Sign up</h1>
                        <p className="text-white/75 font-light text-sm mb-6">Please create your own account.</p>
                        {errors.root && (
                            <p className="text-red-500 text-sm">{errors.root.message}</p>
                        )}
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            clearErrors();
                            handleSubmit(onSubmit)();
                        }} className="mt-1 z-[10]">
                            <fieldset disabled={isLoading} className="w-full flex flex-col gap-2 items-center">
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
                                <fieldset className="w-full">
                                    <input
                                        {...register("confirmPassword", {
                                            required: true,
                                        })}
                                        className="input bg-white/10 border border-white/15 w-full focus:outline-none"
                                        type="password"
                                        placeholder="Confirm Password"
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
                                    className="btn w-full bg-white text-black !border-white mt-4"
                                >
                                    Sign up
                                </button>
                                <Link to="/tos" className="text-xs w-full text-start text-white/75">
                                    Terms of Service
                                </Link>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
            <span className="text-white/75 mt-2 text-sm">Already have an account?<Link to="/auth/signin" className="pl-1 text-white">Sign in!</Link></span>
        </div>
    );
};