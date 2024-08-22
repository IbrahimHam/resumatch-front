import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ApplyJobPage = () => {
  const { user, token } = useContext(AuthContext);
  const [job, setJob] = useState(null);
  const [subject, setSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [latestPdfPath, setLatestPdfPath] = useState(null);
  const navigate = useNavigate();
  const { jobId } = useParams();

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/job/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setJob(response.data.data.job);
        setSubject(`${response.data.data.job.title} - ${user.fullName}`);
      } catch (error) {
        console.error(error);
        setError("Failed to load job data");
      }
    };

    fetchJobData();
  }, [jobId, token, user]);

  useEffect(() => {
    const fetchLatestPdfPath = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/latest-resume-pdf-path`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLatestPdfPath(response.data.data.pdfPath);
      } catch (error) {
        console.error("Failed to load latest resume PDF path:", error);
        setError("Failed to load the latest resume PDF path");
      }
    };

    fetchLatestPdfPath();
  }, [user, token]);

  const generateCoverLetter = async () => {
    setIsGenerating(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/job/${jobId}/create-cover-letter`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const generatedCoverLetter = response.data.data.coverLetter;
      setEmailBody(
        `${generatedCoverLetter}\n\nPlease find my resume attached.`
      );
    } catch (error) {
      console.error(error);
      setError("Failed to generate cover letter");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!latestPdfPath) {
      setError("Failed to retrieve the latest resume PDF.");
      return;
    }

    try {
      const sendResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/send-application`,
        {
          coverLetter: emailBody,
          companyEmail: job.companyId.email,
          resumePdfPath: latestPdfPath,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Application sent successfully:", sendResponse.data);
      // navigate('/jobs'); // Navigate after sending
    } catch (error) {
      console.error(error);
      setError("Failed to send the application");
    }
  };

  if (!job) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900 pt-5 px-4">
      {/* Left Side */}
      <div className="w-1/2 bg-white dark:bg-slate-800 p-8 shadow-lg rounded-lg mr-2 space-y-9 flex flex-col justify-between">
        <div>
          <header className="mb-8">
            <h1 className="text-2xl font-bold mb-4">Apply for {job.title}</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
          </header>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Body
              </label>
              <textarea
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                className="w-full p-2 border rounded-md"
                rows="20"
                placeholder="Your email body will appear here..."
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={generateCoverLetter}
                className={`mt-2 px-4 py-2 rounded-full ${
                  isGenerating ? "bg-gray-300" : "bg-blue-500 text-white"
                } ${isGenerating && "cursor-not-allowed"}`}
                disabled={isGenerating}
              >
                {isGenerating ? "Generating..." : "Generate Cover Letter"}
              </button>
              <button
                type="submit"
                className="mt-2 px-4 py-2 rounded-full bg-green-500 text-white"
              >
                Send Application
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 p-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Job Information</h2>
        <h3 className="text-xl font-semibold mb-2">Job Title:</h3>
        <p className="mb-4">{job.title}</p>
        <h3 className="text-xl font-semibold mb-2">Description:</h3>
        <p className="mb-4">{job.description}</p>
        <h3 className="text-xl font-semibold mb-2">Location:</h3>
        <p className="mb-4">{job.location}</p>
        <h3 className="text-xl font-semibold mb-2">Job Type:</h3>
        <p className="mb-4">{job.jobType}</p>
        <h3 className="text-xl font-semibold mb-2">Company:</h3>
        <p className="mb-4">{job.companyId.name}</p>
        <h3 className="text-xl font-semibold mb-2">Detailed Requirements:</h3>
        <p className="mb-4 whitespace-pre-line">{job.detailedRequirements}</p>
        <h3 className="text-xl font-semibold mb-2">Tags:</h3>
        <div className="flex space-x-4">
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
  );
};

export default ApplyJobPage;
