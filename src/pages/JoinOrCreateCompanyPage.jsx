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

      const updatedUser = { ...user, company_id: response.data.data.recruiter.companyId };
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

        <Button
          onClick={() => navigate("/company/create")}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          Create New Company
        </Button>
      </div>
    </div>
  );
};

export default JoinOrCreateCompanyPage;
