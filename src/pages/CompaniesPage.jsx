import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import Loading from "@/components/Loading";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Filter, Users, MapPin, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const CompaniesPage = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [filter, setFilter] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");

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

  useEffect(() => {
    const getJobs = async () => {
      if (!selectedCompany || !selectedCompany._id) return;

      setLoadingJobs(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/company/${selectedCompany._id}/jobs`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setJobs(response.data.data.jobs);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingJobs(false);
      }
    };
    if (selectedCompany?._id) {
      getJobs();
    }
  }, [selectedCompany]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleCompanyFilterChange = (e) => {
    setCompanyFilter(e.target.value);
  };

  const filteredJobs = jobs.filter((job) => {
    const searchTerm = filter.toLowerCase();
    return (
      job.title.toLowerCase().includes(searchTerm) ||
      job.location.toLowerCase().includes(searchTerm)
    );
  });

  const filteredCompanies = companies.filter((company) => {
    const searchTerm = companyFilter.toLowerCase();
    return (
      company.name.toLowerCase().includes(searchTerm) ||
      company.location.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <>
      <div className="flex flex-col min-h-screen bg-slate-100 dark:bg-slate-900 pt-5 lg:flex-row">
        {/* Left side */}
        <div className="flex-1 lg:w-3/5 md:w-3/5 sm:w-full p-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg mr-4 max-sm:w-full mb-16">
          <h2 className="text-2xl font-bold mb-6">Explore Companies</h2>

          <div className="mb-6 space-y-2">
            <Label htmlFor="query">Search for a Company</Label>
            <Input
              id="query"
              name="query"
              type="text"
              className="w-full border-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Search by Company Name or Location"
              value={companyFilter}
              onChange={handleCompanyFilterChange}
            />
          </div>
          {loading && <Loading />}
          {!loading && filteredCompanies?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">
                Available Companies
              </h3>
              <ul>
                {filteredCompanies?.map((company) => (
                  <li
                    key={company?._id}
                    className={`p-4 border rounded mb-2 cursor-pointer border-gray-500/50 ${
                      selectedCompany?._id === company?._id
                        ? "bg-blue-100 dark:bg-blue-600 dark:text-white"
                        : "bg-gray-100 dark:bg-slate-700"
                    }`}
                    onClick={() => setSelectedCompany(company)}
                  >
                    <h4 className="text-lg font-semibold">{company?.name}</h4>
                    <p>{company?.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {/* Right side */}
        <AnimatePresence>
          {selectedCompany && (
            <>
              <motion.div
                key={selectedCompany._id}
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="p-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg w-2/5 md:w-2/5 sm:w-full max-sm:w-full mb-16"
              >
                <h2 className="text-2xl font-bold mb-6">Selected Company</h2>
                {/* Additional content here */}
                <div className="flex flex-col md:flex-row items-center gap-6 mt-5">
                  <img
                    src={`http://localhost:3000${selectedCompany.image}`}
                    alt="Company Logo"
                    className="rounded-full w-24 h-24 object-cover border-4 border-primary"
                  />
                  <div>
                    <CardTitle className="text-2xl font-bold">
                      {selectedCompany.name}
                    </CardTitle>
                    <div className="flex flex-wrap gap-4 mt-2">
                      <Badge className="flex items-center gap-1 bg-blue-400 text-white dark:bg-blue-600">
                        <Users className="h-4 w-4" />
                        <span>{selectedCompany.employeesNumber} employees</span>
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1 bg-blue-400 text-white dark:bg-blue-600"
                      >
                        <MapPin className="h-4 w-4" />
                        <span>{selectedCompany.location}</span>
                      </Badge>
                      <Badge className="flex items-center gap-1 bg-blue-400 text-white dark:bg-blue-600">
                        <Globe className="h-4 w-4" />
                        <a
                          href={`${selectedCompany.website}`}
                          className="hover:underline "
                        >
                          {selectedCompany.website}
                        </a>
                      </Badge>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mt-4 p-2">
                  {selectedCompany.description}
                </p>

                <Card className="mt-8 mb-8 border-gray-500/25 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold">
                      Open Positions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                      <Input
                        placeholder="Search positions"
                        className="flex-grow"
                        value={filter}
                        onChange={handleFilterChange}
                      />
                      <Button className="bg-blue-100 dark:bg-blue-500">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                      </Button>
                    </div>
                    <ul className="space-y-4">
                      {loadingJobs ? (
                        <Loading />
                      ) : filteredJobs.length > 0 ? (
                        filteredJobs.map((job, index) => (
                          <li
                            key={index}
                            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 p-4 bg-muted rounded-lg"
                          >
                            <div>
                              <h3 className="font-semibold">{job.title}</h3>
                              <span className="flex items-center text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>{job.location}</span>
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className="mr-4 border-gray-500/35">
                                {job.jobType}
                              </Badge>
                              <Link to={`/apply/${job._id}`}>
                                <Button className="bg-blue-600 text-white">
                                  Apply
                                </Button>
                              </Link>
                            </div>
                          </li>
                        ))
                      ) : (
                        <p>No jobs found.</p>
                      )}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default CompaniesPage;
