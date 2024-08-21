import Home from "@/pages/Home";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import CreateJobPage from "@/pages/CreateJobPage";
import CreateCompanyPage from "@/pages/CreateCompanyPage";
import ResumePage from "@/pages/ResumePage";
import SettingsPage from "@/pages/SettingsPage";
import { NotFoundPage, UnauthorizedPage } from "../components/ErrorPages";
import JobListPage from "../pages/JobListPage";
import JoinOrCreateCompanyPage from "../pages/JoinOrCreateCompanyPage";

export const routes = [
  {
    path: "/",
    element: <Home />,
    private: false,
  },
  {
    path: "/login",
    element: <LoginPage />,
    private: false,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    private: false,
  },
  {
    path: "/create-resume/:id",
    element: <ResumePage />,
    private: true,
    allowedRoles: ["user"],
  },
  {
    path: "/create-job",
    element: <CreateJobPage />,
    private: true,
    allowedRoles: ["recruiter"],
  },
  {
    path: "/company/create",
    element: <CreateCompanyPage />,
    private: true,
    allowedRoles: ["recruiter"],
  },
  {
    path: "/settings",
    element: <SettingsPage />,
    private: true,
    allowedRoles: ["user", "recruiter"],
  },
  {
    path: "*",
    element: <NotFoundPage />,
    private: false,
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
    private: false,
  },
  {
    path: "/jobs",
    element: <JobListPage />,
    private: false,
    allowedRoles: ["user", "recruiter"],
  },
  {
    path: "/company/connect",
    element: <JoinOrCreateCompanyPage />,
    private: false,
    allowedRoles: ["user", "recruiter"],
  },
];
