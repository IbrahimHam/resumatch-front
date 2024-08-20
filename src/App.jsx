import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Footer from "./components/Footer/Footer";
import SettingsPage from "./pages/SettingsPage";
import PrivateRoute from "./components/PrivateRoute";
import ResumePage from "./pages/ResumePage";
import CreateCompanyPage from "./pages/CreateCompanyPage.jsx";
import CreateJobPage from "./pages/CreateJobPage.jsx";

function App() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen px-4 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <SettingsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-resume/:id"
            element={
              <PrivateRoute>
                <ResumePage />
              </PrivateRoute>
            }
          />
          {/* <Route
            path="/create-company"
            element={
              <PrivateRoute>
                <CreateCompanyPage />
              </PrivateRoute>
            }
          /> */}
          <Route path="/create-company" element={<CreateCompanyPage />} />
          <Route path="/create-job" element={<CreateJobPage />} />

        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
