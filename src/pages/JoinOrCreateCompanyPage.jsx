import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const JoinOrCreateCompanyPage = () => {
  const { user, token, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [currentCompany, setCurrentCompany] = useState(null);

  useEffect(() => {
    if (user?.company_id) {
      const fetchCurrentCompany = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/company/${user.company_id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setCurrentCompany(response.data.data.company);
        } catch (err) {
          toast.error("Failed to load current company details.");
        }
      };

      fetchCurrentCompany();
    }
  }, [user?.company_id, token]);

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
      fetchAllCompanies();
    }
  }, [query, token]);

  const fetchAllCompanies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/company`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCompanies(response.data.data.companies);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load companies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCompanies();
  }, []);


  const handleJoinCompany = async (companyId) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/company/join-company`,
        { companyId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUser = {
        ...user,
        company_id: response.data.data.recruiter.companyId,
      };
      updateUser(updatedUser);

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
      {/* Left side */}
      <div className="flex-1 p-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg mr-4">
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

        <Button
          onClick={() => navigate("/company/create")}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          Create New Company
        </Button>
      </div>

      {/* Right side */}
      {currentCompany && (
        <div className="w-1/3 p-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Your Current Company:</h3>
          <p>
            <strong>Name:</strong> {currentCompany.name}
          </p>
          <p>
            <strong>Description:</strong> {currentCompany.description}
          </p>
          <p>
            <strong>Location:</strong> {currentCompany.location}
          </p>
          <p>
            <strong>Website:</strong>{" "}
            <a
              href={currentCompany.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {currentCompany.website}
            </a>
          </p>
          {currentCompany.image && (
            <div className="mt-4">
              <strong>Image:</strong>
              <img
                src={`${import.meta.env.VITE_BASE_URL}${currentCompany.image}`}
                alt="Company Logo"
                className="mt-2 max-h-32"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JoinOrCreateCompanyPage;
