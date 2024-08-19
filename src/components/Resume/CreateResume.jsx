import React, { useState, useEffect } from "react";
import axios from "axios";
import ResumeForm from "./ResumeForm";
import TemplateOne from "./templates/TemplateOne";
import TemplateTwo from "./templates/TemplateTwo";
import { useParams } from "react-router-dom";
import debounce from "lodash.debounce";
import { AuthContext } from "@/context/AuthContext";

const CreateResume = () => {
  const { user, isLoggedIn } = React.useContext(AuthContext);
  const [resumeData, setResumeData] = useState({
    name: "",
    contactInfo: {
      email: "",
      phone: "",
      address: "",
    },
    birthDate: "",
    summary: "",
    languages: [],
    education: [],
    experience: [],
    skills: [],
  });

  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const autoSave = debounce(async (data) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/user/update-resume-data`,
        { resumeData: data },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Resume data saved automatically");
    } catch (error) {
      console.error("Error auto-saving resume data:", error);
    }
  }, 500); // 500ms debounce

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/resume-data`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data && response.data.data.resume.length > 0) {
          const resume = response.data.data.resume[0];

          setResumeData({
            name: user.fullName || "",
            email: resume.contactInfo.email || "",
            phone: resume.contactInfo.phone || "",
            address: resume.contactInfo.address || "",
            summary: resume.summary || "",
            languages: resume.languages || [],
            education: resume.education || [],
            experience: resume.experience || [],
            skills: resume.skills || [],
          });
        } else {
          const user = JSON.parse(localStorage.getItem("user"));
          setResumeData({
            ...resumeData,
            name: user.fullName || "",
            email: user.email || "",
          });
        }
      } catch (error) {
        console.error("Error fetching resume data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumeData();
  }, [token]);

  const handleFormUpdate = (updatedData) => {
    setResumeData(updatedData);
    autoSave(updatedData);
  };

  const renderTemplate = () => {
    switch (id) {
      case "1":
        return <TemplateOne data={resumeData} />;
      case "2":
        return <TemplateTwo data={resumeData} />;
      default:
        return <TemplateOne data={resumeData} />;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-6 p-6">
      <div className="col-span-1">
        <ResumeForm onUpdate={handleFormUpdate} initialData={resumeData} />
      </div>
      <div className="col-span-1">{renderTemplate()}</div>
    </div>
  );
};

export default CreateResume;
