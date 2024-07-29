import { Authenticated, ErrorComponent, GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import { authProvider } from "./authProvider";
import { Dashboard } from "./pages/dashboard";
import { Login } from "./pages/auth/LoginPage";
import { Register } from "./pages/auth/RegisterPage";

import axios from "axios";
import { routes } from "./routes";
import { Layout } from "./components/dashboard/Layout";
import PageTitle from "./components/PageTitle";

const axiosInstance = axios.create();

// set withCredentials to true to send cookies

axiosInstance.defaults.withCredentials = true;

export { axiosInstance };

const resources = [
]

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <DevtoolsProvider>
          <Refine
            dataProvider={dataProvider(process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://api.whathappened.dev", axiosInstance)}
            routerProvider={routerBindings}
            authProvider={authProvider}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              useNewQueryKeys: true,
              projectId: "VuxnYh-VgBPqU-NOWti4",
            }}
          >
            <Routes>
              <Route index element={<WelcomePage />} />
              <Route
                element={
                  <Outlet />
                }
              >
                <Route path="*" element={<ErrorComponent />} />
              </Route>
              {routes.map((route, k) => (
                <Route key={k} path={route.path} element={
                  route.needsAuth ? (
                    <Authenticated key={`Auth-${k}`} fallback={<Navigate to="/auth/signin" />}>
                      <PageTitle title={route.title} />
                      <route.component />
                    </Authenticated>
                  ) : (
                    <route.component />
                  )
                } />
              ))}
            </Routes>
            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
          <DevtoolsPanel />
        </DevtoolsProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;