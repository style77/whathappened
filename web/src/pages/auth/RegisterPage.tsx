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
                        <fieldset>
                            <input
                                {...register("confirmPassword", {
                                    required: true,
                                })}
                                className="input input-bordered w-full max-w-xs"
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
                            className="btn btn-md w-full btn-wide btn-primary"
                        >
                            Submit
                        </button>
                    </fieldset>
                </form>
                <div className="flex flex-row justify-between mt-1">
                    <Link to="/auth/signin" className="text-sm text-primary">
                        Have an account?
                    </Link>
                    <Link to="/tos" className="text-sm text-primary">
                        Terms of Service
                    </Link>
                </div>
            </div>
        </div>
    );
};