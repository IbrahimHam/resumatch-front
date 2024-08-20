import React, { useState, useEffect } from "react";
import ShadcnPagination from "@/components/ui/ShadcnPagination";

const PaginatedJobList = ({ jobs }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const handlePageChange = (selectedPage) => {
    if (selectedPage < 1 || selectedPage > totalPages) return;
    setCurrentPage(selectedPage);
  };

  const displayedJobs = jobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  return (
    <div>
      <div className="job-list">
        {displayedJobs.map((job) => (
          <div key={job._id} className="job-item">
            {/* Render job details here */}
            <h3>{job.title}</h3>
            <p>{job.description}</p>
          </div>
        ))}
      </div>

      <ShadcnPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PaginatedJobList;
