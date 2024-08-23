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
import ResumeLibraryPage from "../pages/ResumeLibraryPage";
import CompanyPage from "../pages/CompanyPage";
import CompaniesPage from "../pages/CompaniesPage";
import ApplyPage from "../pages/ApplyPage";

export const routes = [
  {
    path: "/",
    element: <Home />,
    title: "Home - ResuMatch",
    private: false,
  },
  {
    path: "/login",
    element: <LoginPage />,
    title: "Login - ResuMatch",
    private: false,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    title: "Register - ResuMatch",
    private: false,
  },
  {
    path: "/create-resume/:id/:resumeId?",
    element: <ResumePage />,
    title: "Create Resume - ResuMatch",
    private: true,
    allowedRoles: ["user"],
  },
  {
    path: "/create-job",
    element: <CreateJobPage />,
    title: "Create Job - ResuMatch",
    private: true,
    allowedRoles: ["recruiter"],
  },
  {
    path: "/company/create",
    element: <CreateCompanyPage />,
    title: "Create Company - ResuMatch",
    private: true,
    allowedRoles: ["recruiter"],
  },
  {
    path: "/settings",
    element: <SettingsPage />,
    title: "Settings - ResuMatch",
    private: true,
    allowedRoles: ["user", "recruiter"],
  },
  {
    path: "*",
    element: <NotFoundPage />,
    title: "Not Found - ResuMatch",
    private: false,
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
    title: "Unauthorized - ResuMatch",
    private: false,
  },
  {
    path: "/jobs",
    element: <JobListPage />,
    private: false,
    title: "Jobs - ResuMatch",
    allowedRoles: ["user", "recruiter"],
  },
  {
    path: "/company/connect",
    element: <JoinOrCreateCompanyPage />,
    title: "Join To Company - ResuMatch",
    private: true,
    allowedRoles: ["recruiter"],
  },
  {
    path: "/company/",
    element: <CompanyPage />,
    title: "Company - ResuMatch",
    private: true,
    allowedRoles: ["recruiter"],
  },
  {
    path: "/resume",
    element: <ResumeLibraryPage />,
    title: "Resume - ResuMatch",
    private: true,
    allowedRoles: ["user"],
  },
  {
    path: "/companies",
    element: <CompaniesPage />,
    title: "Companies - ResuMatch",
    private: true,
    allowedRoles: ["user"],
  },
  {
    path: "/apply/:jobId",
    element: <ApplyPage />,
    title: "Apply To Job - ResuMatch",
    private: true,
    allowedRoles: ["user"],
  },
];
