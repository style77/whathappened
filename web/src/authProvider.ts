import type { AuthProvider } from "@refinedev/core";
import { getIdentity, handleLogin, handleLogout, handleRegister, handleVerify } from "./utils/auth";

export const authProvider: AuthProvider = {
  login: async ({ email, password }: {
    email: string, password: string
  }) => {
    return await handleLogin(email, password);
  },
  register: async ({ email, password, confirmPassword }) => {
    return await handleRegister(email, password, confirmPassword);
  },
  logout: async () => {
    return await handleLogout();
  },
  check: async () => {
    return await handleVerify();
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    return await getIdentity();
  },
  onError: async (error) => {
    return { error };
  },
};
