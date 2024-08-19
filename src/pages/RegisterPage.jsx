import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AuthContext } from "@/context/AuthContext";
import { ThemeContext } from "@/context/ThemeContext";
import { AlertCircle } from "lucide-react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const { login, isLoggedIn } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/${role}/register`,
        formData
      );
      const { token, user, recruiter } = response.data;
      const userData = { ...user, ...recruiter, role };
      toast.success("Registration successful!");
      setTimeout(() => {
        login(token, userData);
        navigate("/");
      }, 1000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoggedIn) {
    return null;
  }

  return (
    <div
      className={`flex justify-center items-center min-h-screen bg-slate-100 dark:bg-slate-900 ${theme}`}
    >
      <Toaster position="top-center" />
      <div className="w-full max-w-md p-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <img src="/2.png" alt="ResuMatch Logo" className="h-12 w-auto" />
        </div>

        <Tabs defaultValue="user" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 p-0 bg-slate-200 dark:bg-slate-700 rounded-lg">
            <TabsTrigger
              value="user"
              onClick={() => setRole("user")}
              className="py-2 px-4 rounded-md data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
            >
              User Register
            </TabsTrigger>
            <TabsTrigger
              value="recruiter"
              onClick={() => setRole("recruiter")}
              className="py-2 px-4 rounded-md data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
            >
              Recruiter Register
            </TabsTrigger>
          </TabsList>

          <TabsContent value="user">
            <RegisterForm
              role="User"
              onSubmit={handleSubmit}
              isLoading={isLoading}
              error={error}
              formData={formData}
              handleInputChange={handleInputChange}
            />
          </TabsContent>

          <TabsContent value="recruiter">
            <RegisterForm
              role="Recruiter"
              onSubmit={handleSubmit}
              isLoading={isLoading}
              error={error}
              formData={formData}
              handleInputChange={handleInputChange}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const RegisterForm = ({
  role,
  onSubmit,
  isLoading,
  error,
  formData,
  handleInputChange,
}) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="fullName">Full Name</Label>
      <Input
        id="fullName"
        name="fullName"
        type="text"
        value={formData.fullName}
        onChange={handleInputChange}
        className={`w-full border-2 focus:ring-2 focus:ring-blue-500 ${
          error && !formData.fullName ? "border-red-500" : "border-gray-300"
        }`}
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        className={`w-full border-2 focus:ring-2 focus:ring-blue-500 ${
          error && !formData.email ? "border-red-500" : "border-gray-300"
        }`}
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleInputChange}
        className={`w-full border-2 focus:ring-2 focus:ring-blue-500 ${
          error && !formData.password ? "border-red-500" : "border-gray-300"
        }`}
      />
    </div>

    {error && (
      <Alert className="bg-red-500 text-white border-none shadowl-xl">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )}

    <Button
      type="submit"
      className="w-full bg-blue-500 hover:bg-blue-600 text-white"
      disabled={isLoading}
    >
      {isLoading ? "Registering..." : `Register as ${role}`}
    </Button>
    <div className="flex items-center justify-center space-x-2 text-sm">
      <span>Already have an account?</span>
      <Link to="/login" className="text-blue-500 hover:underline">
        Login
      </Link>
    </div>
  </form>
);

export default RegisterPage;
