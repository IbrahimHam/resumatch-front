import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import ShadcnPagination from "@/components/ui/ShadcnPagination";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/Select";

const JobListPage = () => {
  const { user, token } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [recruiterJobs, setRecruiterJobs] = useState([]);
  const [tags, setTags] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("View all");
  const [selectedTag, setSelectedTag] = useState("View all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showMyJobs, setShowMyJobs] = useState(false);
  const jobsPerPage = 3;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/job`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setJobs(response.data.data.jobs);
        setSelectedJob(response.data.data.jobs[0]);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [token]);

  useEffect(() => {
    if (user?.role === "recruiter") {
      const fetchRecruiterJobs = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/job/posted-jobs`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setRecruiterJobs(response.data.data.postedJobs);
        } catch (err) {
          setError(
            err.response?.data?.message || "Failed to load recruiter jobs."
          );
        }
      };

      fetchRecruiterJobs();
    }
  }, [token, user?.role]);

  useEffect(() => {
    if (jobs.length > 0) {
      const uniqueTags = [...new Set(jobs.flatMap((job) => job.tags))];
      const uniqueLocations = [...new Set(jobs.map((job) => job.location))];

      setTags(uniqueTags);
      setLocations(uniqueLocations);
    }
  }, [jobs]);

  const filteredJobs = jobs.filter((job) => {
    const matchesLocation =
      selectedLocation === "View all" || job.location === selectedLocation;
    const matchesTag =
      selectedTag === "View all" || job.tags.includes(selectedTag);
    const matchesMyJobs = !showMyJobs || recruiterJobs;

    return matchesLocation && matchesTag && matchesMyJobs;
  });

  const handleFilterChange = (type, value) => {
    if (type === "location") {
      setSelectedLocation(value);
    } else if (type === "tag") {
      setSelectedTag(value);
    }
    setCurrentPage(1);
  };

  const displayedJobs = filteredJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900 pt-20 px-4">
      {/* Left Side */}
      <div className="w-1/2 bg-white dark:bg-slate-800 p-8 shadow-lg rounded-lg mr-2 space-y-9 flex flex-col justify-between">
        <div>
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Explore Our Job Openings
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Join our mission to innovate and revolutionize the industry. Find
              a position that fits your skills and passion. Your journey with us
              starts here!
            </p>
          </header>

          <div className="flex justify-center mb-6 space-x-4">
            <button
              onClick={() => {
                handleFilterChange("location", "View all");
                handleFilterChange("tag", "View all");
                setShowMyJobs(false);
              }}
              className={`${
                selectedLocation === "View all" &&
                selectedTag === "View all" &&
                !showMyJobs
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300"
              } px-4 py-2 rounded-full`}
            >
              View all
            </button>

            <Select
              value={selectedLocation}
              onValueChange={(value) => handleFilterChange("location", value)}
            >
              <SelectTrigger>Location</SelectTrigger>
              <SelectContent>
                {locations
                  .filter((location) => location) // Ensure no empty strings
                  .map((location, index) => (
                    <SelectItem key={index} value={location}>
                      {location}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedTag}
              onValueChange={(value) => handleFilterChange("tag", value)}
            >
              <SelectTrigger>Tags</SelectTrigger>
              <SelectContent>
                {tags
                  .filter((tag) => tag)
                  .map((tag, index) => (
                    <SelectItem key={index} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            {user?.role === "recruiter" && (
              <button
                onClick={() => setShowMyJobs(!showMyJobs)}
                className={`${
                  showMyJobs
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300"
                } px-4 py-2 rounded-full`}
              >
                My Jobs
              </button>
            )}
          </div>

          <div className="space-y-4">
            {loading && <p>Loading jobs...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {displayedJobs.length > 0 ? (
              displayedJobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md flex justify-between items-center cursor-pointer"
                  onClick={() => setSelectedJob(job)}
                >
                  <div>
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {job.description}
                    </p>
                    <div className="flex space-x-4">
                      <span className="bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full">
                        {job.location}
                      </span>
                      <span className="bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full">
                        {job.jobType}
                      </span>
                      {job.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No jobs available for this filter.</p>
            )}
          </div>
        </div>

        {/* Pagination */}
        {filteredJobs.length > jobsPerPage && (
          <div className="mt-auto">
            <ShadcnPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      {/* Right Side */}
      {selectedJob && (
        <div className="flex-1 p-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">{selectedJob.title}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            {selectedJob.description}
          </p>
          <h3 className="text-xl font-semibold mb-2">Location:</h3>
          <p className="mb-4">{selectedJob.location}</p>
          <h3 className="text-xl font-semibold mb-2">Job Type:</h3>
          <p className="mb-4">{selectedJob.jobType}</p>
          <h3 className="text-xl font-semibold mb-2">Company:</h3>
          <p className="mb-4">{selectedJob.companyId.name}</p>
          <h3 className="text-xl font-semibold mb-2">Detailed Requirements:</h3>
          <p className="mb-4 whitespace-pre-line">
            {selectedJob.detailedRequirements}
          </p>
          <h3 className="text-xl font-semibold mb-2">Tags:</h3>
          <div className="flex space-x-4">
            {selectedJob.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-4">
            {user?.role === "user" ? (
              <a
                href={`/apply/${selectedJob._id}`}
                className="text-blue-500 hover:underline"
              >
                Apply →
              </a>
            ) : user?.role === "recruiter" &&
              selectedJob.companyId._id === user?.companyId ? (
              <a
                href={`/edit-job/${selectedJob._id}`}
                className="text-blue-500 hover:underline"
              >
                Edit Job →
              </a>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobListPage;
