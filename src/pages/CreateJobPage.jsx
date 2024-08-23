import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import CustomSelect from "@/components/ui/CustomSelect";

const CreateJobPage = () => {
  const { user } = React.useContext(AuthContext);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [companyInfo, setCompanyInfo] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    jobType: "",
    tags: "",
    detailedRequirements: "",
    requirements: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      if (!user.company_id) {
        navigate("/company/connect");
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/company/${user.company_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCompanyInfo(response.data.data.company);
      } catch (err) {
        console.error("Error fetching company information:", err);
      }
    };

    if (user.company_id) {
      fetchCompanyInfo();
    }
  }, [user, token, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleAddRequirement = () => {
    setFormData((prev) => ({
      ...prev,
      requirements: [...prev.requirements, { skill: "", level: "" }],
    }));
  };

  const handleRequirementChange = (index, key, value) => {
    const updatedRequirements = formData.requirements.map((req, i) => {
      if (i === index) {
        return { ...req, [key]: value };
      }
      return req;
    });

    setFormData((prev) => ({
      ...prev,
      requirements: updatedRequirements,
    }));
  };

  const handleRemoveRequirement = (index) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    if (
      !formData.title ||
      !formData.description ||
      !formData.location ||
      !formData.jobType
    ) {
      setError("Please fill in all required fields.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const jobData = {
        ...formData,
        tags: formData.tags.split(",").map((tag) => tag.trim()),
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/job`, jobData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Job posted successfully!");
      setTimeout(() => {
        navigate("/jobs");
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to post job.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900 pt-20">
      <Toaster position="top-center" />
      {/* Left side */}
      <div className="w-1/3 bg-white dark:bg-slate-800 p-8 shadow-lg rounded-lg mr-2 space-y-9">
        <h2 className="text-xl font-semibold mb-4">Job Details</h2>
        <p>
          <strong>Title:</strong> {formData.title || "Not provided"}
        </p>
        <p>
          <strong>Description:</strong> {formData.description || "Not provided"}
        </p>
        <p>
          <strong>Location:</strong> {formData.location || "Not provided"}
        </p>
        <p>
          <strong>Job Type:</strong> {formData.jobType || "Not provided"}
        </p>
        <p>
          <strong>Tags:</strong> {formData.tags || "Not provided"}
        </p>
        <div>
          <strong>Requirements:</strong>
          {formData.requirements.length > 0 ? (
            <ul className="list-disc ml-4">
              {formData.requirements.map((req, index) => (
                <li key={index} className="mt-2">
                  {req.skill} - {req.level}
                </li>
              ))}
            </ul>
          ) : (
            <p>Not provided</p>
          )}
        </div>
        <div>
          <strong>Detailed Requirements:</strong>
          <p className="whitespace-pre-line">
            {formData.detailedRequirements || "Not provided"}
          </p>
        </div>
        {companyInfo && (
          <p>
            <strong>Company:</strong> {companyInfo.name || "Not provided"}
          </p>
        )}
      </div>
      {/* Right side */}
      <div className="flex-1 p-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Post a Job</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              name="title"
              type="text"
              value={formData.title}
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
            <Label htmlFor="jobType">Job Type</Label>
            <CustomSelect
              options={["Full-time", "Part-time", "Contract", "Internship"]}
              value={formData.jobType}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, jobType: value }))
              }
              placeholder="Select Job Type"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              name="tags"
              type="text"
              value={formData.tags}
              onChange={handleInputChange}
              className="w-full border-2 focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., React, Node.js"
            />
          </div>

          <div className="space-y-2">
            <Label className="mr-5">Requirements</Label>
            {formData.requirements.map((req, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <Input
                  name={`skill-${index}`}
                  type="text"
                  placeholder="Skill"
                  value={req.skill}
                  onChange={(e) =>
                    handleRequirementChange(index, "skill", e.target.value)
                  }
                  className="w-1/2 border-2 focus:ring-2 focus:ring-blue-500"
                />
                <Input
                  name={`level-${index}`}
                  type="text"
                  placeholder="Level"
                  value={req.level}
                  onChange={(e) =>
                    handleRequirementChange(index, "level", e.target.value)
                  }
                  className="w-1/2 border-2 focus:ring-2 focus:ring-blue-500"
                />
                <Button
                  type="button"
                  onClick={() => handleRemoveRequirement(index)}
                  className="bg-red-500 text-white"
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={handleAddRequirement}
              className="bg-green-500 text-white"
            >
              Add Requirement
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="detailedRequirements">
              🎯 Detailed Requirements
            </Label>
            <textarea
              id="detailedRequirements"
              name="detailedRequirements"
              rows="5"
              value={formData.detailedRequirements}
              onChange={handleInputChange}
              className="w-full border-2 focus:ring-2 focus:ring-blue-500 p-2 rounded-md"
              placeholder="• The ideal candidate should be passionate about improving and adapting today's technologies...
• Experienced in developing with C#, JavaScript, HTML, CSS, Angular..."
            />
          </div>

          {error && <div className="text-red-500">{error}</div>}

          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Posting Job..." : "Post Job"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateJobPage;
