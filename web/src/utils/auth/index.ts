import { axiosInstance } from "../../App";
import { API_URL } from "../../constants";

import { AxiosError } from "axios";

export const handleLogin = async (email: string, password: string) => {
    try {
        const r = await axiosInstance.post(`${API_URL}/auth/login`, {
            email,
            password
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (r.status === 200) {
            return {
                success: true,
                redirectTo: "/dashboard",
            };
        }
    } catch (error) {
        // error responses are more verbose on the API side - we don't want to expose that to the client
        // TODO: handle error responses more gracefully
        return {
            success: false,
            error: {
                name: "LoginError",
                message: "Invalid email or password"
            }
        }
    }

    return {
        success: false,
        error: {
            name: "LoginError",
            message: "Invalid email or password"
        }
    }
}

export const handleRegister = async (email: string, password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
        return {
            success: false,
            error: {
                name: "RegisterError",
                message: "Passwords do not match"
            }
        }
    }

    try {
        const r = await axiosInstance.post(`${API_URL}/auth/register`, {
            email,
            password
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (r.status === 201) {
            return {
                success: true,
                redirectTo: "/auth/signin",
            };
        }
    } catch (error) {
        return {
            success: false,
            error: {
                name: "RegisterError",
                message: (error as any)?.response?.data?.message || "An error occurred while registering"
            }
        }
    }

    return {
        success: false,
        error: {
            name: "RegisterError",
            message: "An error occurred while registering"
        }
    }
}

export const handleLogout = async () => {
    try {
        const r = await axiosInstance.get(`${API_URL}/auth/logout`, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (r.status === 200) {
            return {
                success: true,
                redirectTo: "/auth/signin",
            };
        }
    } catch (error) {
        return {
            success: false,
            error: {
                name: "LogoutError",
                message: "An error occurred while logging out"
            }
        }
    }

    return {
        success: false,
        error: {
            name: "LogoutError",
            message: "An error occurred while logging out"
        }
    }
}

export const handleVerify = async () => {
    try {
        const r = await axiosInstance.get(`${API_URL}/auth/verify`, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (r.status === 200) {
            return {
                authenticated: true,
            };
        }
    } catch (error) {
        return {
            authenticated: false,
            redirectTo: "/auth/signin",
        };
    }

    return {
        authenticated: false,
        redirectTo: "/auth/signin",
    };
}

export const getIdentity = async () => {
    try {
        const r = await axiosInstance.get(`${API_URL}/auth/me`, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (r.status === 200) {
            return {
                id: r.data.id,
                email: r.data.email,
                createdAt: r.data.createdAt,
            };
        }
    } catch (error) {
        return null
    }

    return null
}