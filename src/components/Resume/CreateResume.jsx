import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ResumeForm from "./ResumeForm";
import TemplateOne from "./templates/TemplateOne";
import TemplateTwo from "./templates/TemplateTwo";
import TemplateThree from "./templates/TemplateThree";
import TemplateFour from "./templates/TemplateFour";
import TemplateFive from "./templates/TemplateFive";
import { useParams } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import Modal from "./templates/Modal";
import { Expand } from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import PDFTemplateOne from "./templates/PDFTemplateOne";
import PDFTemplateFour from "./templates/PDFTemplateFour";
import PDFTemplateThree from "./templates/PDFTemplateThree";
import PDFTemplateTwo from "./templates/PDFTemplateTwo";
import PDFTemplateFive from "./templates/PDFTemplateFive";
import Loading from "@/components/Loading";

const CreateResume = () => {
  const { token, user } = React.useContext(AuthContext);
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

  const { id, resumeId } = useParams();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [existingResume, setExistingResume] = useState(false);
  const [templateId, setTemplateId] = useState(null);
  const templateRef = useRef(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const renderPDF = () => {
    switch (id) {
      case "1":
        return <PDFTemplateOne data={resumeData} />;
      case "2":
        return <PDFTemplateTwo data={resumeData} />;
      case "3":
        return <PDFTemplateThree data={resumeData} />;
      case "4":
        return <PDFTemplateFour data={resumeData} />;
      case "5":
        return <PDFTemplateFive data={resumeData} />;
      default:
        return <PDFTemplateOne data={resumeData} />;
    }
  };

  const handleDownload = async () => {
    const blob = await pdf(renderPDF()).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "resume.pdf";
    link.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const fetchResumeData = async () => {
      if (resumeId) {
        setTemplateId(resumeId);
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/resume-data`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data && response.data.data.resume.length > 0) {
          const resume = response.data.data.resume[0];
          setExistingResume(true);

          setResumeData({
            name: resume.name || user.fullName || "",
            contactInfo: {
              email: resume.contactInfo.email || "",
              phone: resume.contactInfo.phone || "",
              address: resume.contactInfo.address || "",
            },
            birthDate: resume.birthDate || "",
            summary: resume.summary || "",
            languages: resume.languages || [],
            education: resume.education || [],
            experience: resume.experience || [],
            skills: resume.skills || [],
          });
        } else {
          const user = JSON.parse(localStorage.getItem("user"));
          setExistingResume(false);

          setResumeData({
            ...resumeData,
            name: user.fullName,
            contactInfo: {
              email: user.email,
            },
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
  };

  const renderTemplate = () => {
    switch (id) {
      case "1":
        return <TemplateOne data={resumeData} />;
      case "2":
        return <TemplateTwo data={resumeData} />;
      case "3":
        return <TemplateThree data={resumeData} />;
      case "4":
        return <TemplateFour data={resumeData} />;
      case "5":
        return <TemplateFive data={resumeData} />;
      default:
        return <TemplateOne data={resumeData} />;
    }
  };

  const saveTemplate = async () => {
    try {
      const templateElement = templateRef.current;
      if (templateElement) {
        const templateHTML = templateElement.innerHTML;

        const fullHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Resume Template</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        </head>
        <body>
          <div class="container mx-auto p-4">
            ${templateHTML}
          </div>
        </body>
        </html>
      `;

        await axios.post(
          `${import.meta.env.VITE_API_URL}/user/save-template`,
          { htmlContent: fullHTML },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Template saved successfully.");
      }
    } catch (error) {
      console.error("Failed to save the template:", error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="md:w-2/4 overflow-y-auto p-4">
          <ResumeForm
            onUpdate={handleFormUpdate}
            initialData={resumeData}
            token={token}
            existingResume={existingResume}
            setExistingResume={setExistingResume}
            templateId={templateId}
            setTemplateId={setTemplateId}
            templateLink={id}
            saveTemplate={saveTemplate}
          />
        </div>
        <div
          className="col-span-1 md:w-2/4 p-4 md:sticky md:top-0 md:h-screen overflow-y-auto bg-gray-100"
          id="resume"
          ref={templateRef}
        >
          <div className="flex justify-between mb-4">
            <button
              onClick={toggleModal}
              className="bg-gray-600 text-white px-2 py-0 rounded-md"
            >
              <Expand size={20} />
            </button>

            <button
              onClick={handleDownload}
              className="bg-green-500 text-white px-4 py-2 rounded-md ml-4"
            >
              Download
            </button>

            {isModalOpen && (
              <Modal toggleModal={toggleModal}>
                <div id="resume-content">{renderTemplate()}</div>
              </Modal>
            )}
          </div>
          {renderTemplate()}
        </div>
      </div>
    </>
  );
};

export default CreateResume;
