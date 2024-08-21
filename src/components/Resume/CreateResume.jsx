import React, { useState, useEffect } from "react";
import axios from "axios";
import ResumeForm from "./ResumeForm";
import TemplateOne from "./templates/TemplateOne";
import TemplateTwo from "./templates/TemplateTwo";
import TemplateThree from "./templates/TemplateThree";
import TemplateFour from "./templates/TemplateFour";
import { useParams } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Modal from "./templates/Modal";
import { Expand } from "lucide-react";
import { set } from "react-hook-form";

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

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const downloadPDF = () => {
    const input = document.getElementById("resume");

    html2canvas(input, {
      scale: 2,
      backgroundColor: null,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("resume.pdf");
    });
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
      default:
        return <TemplateOne data={resumeData} />;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="md:w-2/4 overflow-y-auto p-4">
          {resumeId}
          <ResumeForm
            onUpdate={handleFormUpdate}
            initialData={resumeData}
            token={token}
            existingResume={existingResume}
            setExistingResume={setExistingResume}
            templateId={templateId}
            setTemplateId={setTemplateId}
            templateLink={id}
          />
        </div>
        <div
          className="col-span-1 md:w-2/4 p-4 md:sticky md:top-0 md:h-screen overflow-y-auto bg-gray-100"
          id="resume"
        >
          <div className="flex justify-between mb-4">
            <button
              onClick={toggleModal}
              className="bg-gray-600 text-white px-2 py-0 rounded-md"
            >
              <Expand size={20} />
            </button>

            <button
              onClick={downloadPDF}
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
