import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import Loading from "@/components/Loading";

const CompaniesPage = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
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
        toast.error("Failed to load companies.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [token]);

  return (
    <>
      <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900 pt-20">
        {/* Left side */}
        <div className="flex-1 p-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg mr-4">
          <h2 className="text-2xl font-bold mb-6">Join or Create a Company</h2>

          <div className="mb-6 space-y-2">
            <Label htmlFor="query">Search for a Company</Label>
            {/* <Input
              id="query"
              name="query"
              type="text"
              className="w-full border-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter company name"
            /> */}
          </div>
          {loading && <Loading />}
          {!loading && companies?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">
                Available Companies:
              </h3>
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
        </div>
      </div>
    </>
  );
};

export default CompaniesPage;
