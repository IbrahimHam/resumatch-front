import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const JoinOrCreateCompanyPage = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
    location: "",
    website: "",
    employeesNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (query) {
      const fetchCompanies = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/company/search`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              params: { query },
            }
          );
          setCompanies(response.data.data.companies);
        } catch (err) {
          toast.error("Failed to load companies.");
        } finally {
          setLoading(false);
        }
      };

      fetchCompanies();
    } else {
      setCompanies([]);
    }
  }, [query, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.description ||
      !formData.location ||
      !formData.employeesNumber
    ) {
      setError("Please fill in all required fields.");
      return false;
    }
    if (!formData.image) {
      setError("Please upload an image.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("image", formData.image);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("website", formData.website);
    formDataToSend.append("employeesNumber", formData.employeesNumber);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/company`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Company created successfully!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create company.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinCompany = async (companyId) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/company/join-company`,
        { companyId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Joined company successfully!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      toast.error("Failed to join company.");
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900 pt-20">
      <Toaster position="top-center" />
      <div className="w-full max-w-4xl mx-auto p-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Join or Create a Company</h2>

        <div className="mb-6 space-y-2">
          <Label htmlFor="query">Search for a Company</Label>
          <Input
            id="query"
            name="query"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter company name"
          />
        </div>

        {loading && <p>Loading companies...</p>}
        {!loading && companies?.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Available Companies:</h3>
            <ul>
              {companies?.map((company) => (
                <li
                  key={company?._id}
                  className={`p-4 border rounded mb-2 cursor-pointer ${
                    selectedCompany?._id === company?._id
                      ? "bg-blue-100"
                      : "bg-gray-100 dark:bg-slate-700"
                  }`}
                  onClick={() => setSelectedCompany(company)}
                >
                  <h4 className="text-lg font-semibold">{company?.name}</h4>
                  <p>{company?.description}</p>
                </li>
              ))}
            </ul>
            {selectedCompany && (
              <div className="mt-4">
                <Button
                  onClick={() => handleJoinCompany(selectedCompany?._id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Join {selectedCompany?.name}
                </Button>
              </div>
            )}
          </div>
        )}

        {!loading && companies?.length === 0 && query && (
          <div className="mb-6">
            <p>No companies found. You can create a new one.</p>
          </div>
        )}

        {!showCreateForm && (
          <Button
            onClick={() => navigate("/company/create")}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            Create New Company
          </Button>
        )}

        {showCreateForm && (
          <form
            onSubmit={handleSubmit}
            className="space-y-4 mt-6"
            encType="multipart/form-data"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Company Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                type="text"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full border-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full border-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                type="text"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full border-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Company Image</Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employeesNumber">Number of Employees</Label>
              <CustomSelect
                options={["0-50", "50-100", "More than 100"]}
                value={formData.employeesNumber}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    employeesNumber: value,
                  }))
                }
                placeholder="Select Employees Number"
              />
            </div>

            {error && <div className="text-red-500">{error}</div>}

            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Creating Company..." : "Create Company"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default JoinOrCreateCompanyPage;
