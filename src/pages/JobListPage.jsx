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
import { Tooltip } from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "@/components/ui/ConfirmationDialog";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [jobData, setJobData] = useState({}); // Separate state for job data
  const jobsPerPage = 3;
  const navigate = useNavigate();

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
    if (jobs?.length > 0) {
      const uniqueTags = [...new Set(jobs.flatMap((job) => job.tags))];
      const uniqueLocations = [...new Set(jobs.map((job) => job.location))];

      setTags(uniqueTags);
      setLocations(uniqueLocations);
    }
  }, [jobs]);

  const filteredJobs = jobs?.filter((job) => {
    const matchesLocation =
      selectedLocation === "View all" || job.location === selectedLocation;
    const matchesTag =
      selectedTag === "View all" || job.tags.includes(selectedTag);
    const matchesMyJobs = !showMyJobs || recruiterJobs.some((recruiterJob) => recruiterJob._id === job._id);

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

  const displayedJobs = filteredJobs?.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  const totalPages = Math.ceil(filteredJobs?.length / jobsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCreateJobClick = () => {
    if (!user?.company_id) {
      navigate("/company/connect");
    } else {
      navigate("/create-job");
    }
  };

  const handleEdit = (jobId) => {
    const jobToEdit = jobs.find((job) => job._id === jobId);
    setJobData(jobToEdit);
    setIsDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      let updatedTags = jobData.tags;
      if (typeof updatedTags === "string") {
        updatedTags = updatedTags.split(",").map((tag) => tag.trim());
      }
      const updatedJobData = { ...jobData, tags: updatedTags };
      await axios.put(
        `${import.meta.env.VITE_API_URL}/job/${updatedJobData._id}`,
        updatedJobData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === updatedJobData._id ? { ...job, ...updatedJobData } : job
        )
      );

      setSelectedJob({ ...selectedJob, ...updatedJobData });
      setJobData({});
      setIsDialogOpen(false);
    } catch (err) {
      setError("Failed to update the job.");
    }
  };

  const handleDelete = async (jobId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/job/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJobs((prevJobs) => {
        const updatedJobs = prevJobs.filter((job) => job._id !== jobId);

        const updatedFilteredJobs = updatedJobs.filter((job) => {
          const matchesLocation =
            selectedLocation === "View all" || job.location === selectedLocation;
          const matchesTag =
            selectedTag === "View all" || job.tags.includes(selectedTag);
          const matchesMyJobs =
            !showMyJobs ||
            recruiterJobs.some((recruiterJob) => recruiterJob._id === job._id);

          return matchesLocation && matchesTag && matchesMyJobs;
        });

        if (updatedFilteredJobs.length > 0) {
          setSelectedJob(updatedFilteredJobs[0]);
        } else {
          setSelectedJob(null);
        }

        return updatedJobs;
      });

      setIsDialogOpen(false);
    } catch (err) {
      setError("Failed to delete the job.");
    }
  };

  const confirmDelete = () => {
    setIsDialogOpen(true);
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
                  .filter((location) => location)
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

            {user?.role === "recruiter" && (
              <>
                {!user?.company_id ? (
                  <Tooltip content="Please connect to a company before posting jobs">
                    <button
                      onClick={handleCreateJobClick}
                      disabled={!user?.company_id}
                      className="px-4 py-2 rounded-full bg-gray-200 text-gray-400 cursor-not-allowed"
                    >
                      Create Job
                    </button>
                  </Tooltip>
                ) : (
                  <button
                    onClick={handleCreateJobClick}
                    className="px-4 py-2 rounded-full bg-blue-500 text-white"
                  >
                    Create Job
                  </button>
                )}
              </>
            )}
          </div>

          <div className="space-y-4">
            {loading && <p>Loading jobs...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {displayedJobs?.length > 0 ? (
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
                      {job?.tags?.map((tag, index) => (
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
        {filteredJobs?.length > jobsPerPage && (
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
          <h2 className="text-2xl font-bold mb-6">{selectedJob?.title}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            {selectedJob?.description}
          </p>
          <h3 className="text-xl font-semibold mb-2">Location:</h3>
          <p className="mb-4">{selectedJob?.location}</p>
          <h3 className="text-xl font-semibold mb-2">Job Type:</h3>
          <p className="mb-4">{selectedJob?.jobType}</p>
          <h3 className="text-xl font-semibold mb-2">Company:</h3>
          <p className="mb-4">{selectedJob?.companyId?.name}</p>
          <h3 className="text-xl font-semibold mb-2">Detailed Requirements:</h3>
          <p className="mb-4 whitespace-pre-line">
            {selectedJob?.detailedRequirements}
          </p>
          <h3 className="text-xl font-semibold mb-2">Tags:</h3>
          <div className="flex space-x-4">
            {selectedJob?.tags?.map((tag, index) => (
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
              <div className="justify-end">
                <button
                  onClick={() => handleApply(selectedJob?._id)}
                  className={
                    "px-4 py-2 rounded-full bg-blue-500 text-white transition-colors duration-200 ease-in-out hover:bg-blue-600"
                  }
                >
                  Apply
                </button>
              </div>
            ) : user?.role === "recruiter" &&
              selectedJob?.companyId._id === user?.company_id ? (
              <div className="flex space-x-2 justify-end">
                <button
                  onClick={() => handleEdit(selectedJob?._id)}
                  className={"px-4 py-2 rounded-full bg-blue-500 text-white transition-colors duration-200 ease-in-out hover:bg-blue-600"}
                >
                  Edit
                </button>
                <button
                  onClick={() => confirmDelete()}
                  className={"px-4 py-2 rounded-full bg-red-500 text-white transition-colors duration-200 ease-in-out hover:bg-red-600"}
                >
                  Delete
                </button>
              </div>
            ) : null}
          </div>
        </div>
      )}
      <ConfirmationDialog
        isOpen={isDialogOpen}
        title={jobData.title ? "Edit Job" : "Delete Job"}
        description={
          jobData.title
            ? "Update the job details below:"
            : "Are you sure you want to delete this job?"
        }
        onConfirm={
          jobData.title ? handleSaveEdit : () => handleDelete(selectedJob?._id)
        }
        onCancel={() => {
          setIsDialogOpen(false);
          setJobData({});
        }}
        jobData={jobData}
        setJobData={setJobData}
      />
    </div>
  );
};

export default JobListPage;
