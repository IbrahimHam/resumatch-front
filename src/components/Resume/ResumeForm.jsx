import React, { useEffect, useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { set } from "react-hook-form";

const ResumeForm = ({
  onUpdate,
  initialData,
  token,
  existingResume,
  setExistingResume,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    contactInfo: {
      email: "",
      phone: "",
      address: "",
    },
    birthDate: "",
    summary: "",
    languages: [""],
    education: [{ institution: "", degree: "", startDate: "", endDate: "" }],
    experience: [
      {
        jobTitle: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    skills: [""],
  });

  const [isSaving, setIsSaving] = useState(false);
  const lastSaveTimeRef = useRef(0);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        languages: initialData.languages || [""],
        education: initialData.education || [
          { institution: "", degree: "", startDate: "", endDate: "" },
        ],
        experience: initialData.experience || [
          {
            jobTitle: "",
            company: "",
            startDate: "",
            endDate: "",
            description: "",
          },
        ],
        skills: initialData.skills || [""],
      });
    }
  }, [initialData]);

  const handleSave = useCallback(async () => {
    const currentTime = Date.now();
    if (currentTime - lastSaveTimeRef.current < 30000) {
      toast.error("You should wait to save again.");
      return;
    }

    setIsSaving(true);
    try {
      if (existingResume) {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/user/update-resume-data`,
          {
            data: formData,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 200) {
          lastSaveTimeRef.current = currentTime;
          toast.success("Saved successfully!");
        }
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/user/create-resume-data`,
          {
            data: formData,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 201) {
          lastSaveTimeRef.current = currentTime;
          toast.success("Saved successfully!");
          setExistingResume(true);
        }
      }
    } catch (error) {
      console.error("Error saving resume data:", error);
    } finally {
      setIsSaving(false);
    }
  }, [formData, token]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const formData = new FormData();
      formData.append("file", file);

      const toastId = toast.loading("Extracting your data...");

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/user/upload-resume`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          toast.dismiss(toastId);
          toast.success("Upload successful! Refreshing...");
          window.location.reload();
        }
        console.log(response.message);
      } catch (error) {
        toast.dismiss(toastId);
        toast.error("Failed to extract data from resume.");

        console.error("Error uploading resume:", error);
      }
    } else {
      toast.error("Please upload a PDF file.");
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full p-4">
        <h3 className="text-xl font-bold mb-4">Resume Form</h3>

        {/* Upload Resume Button */}
        <div className="mb-4">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileUpload}
            className="mb-2 hidden"
          />
          <Button
            onClick={() => document.querySelector('input[type="file"]').click()}
          >
            Upload your existing resume
          </Button>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label>Name</label>
          <Input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={(e) => {
              const updatedData = { ...formData, name: e.target.value };
              setFormData(updatedData);
              onUpdate(updatedData);
            }}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label>Email</label>
          <Input
            type="email"
            name="email"
            value={formData.contactInfo.email || ""}
            onChange={(e) => {
              const updatedContactInfo = {
                ...formData.contactInfo,
                email: e.target.value,
              };
              const updatedData = {
                ...formData,
                contactInfo: updatedContactInfo,
              };
              setFormData(updatedData);
              onUpdate(updatedData);
            }}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label>Phone</label>
          <Input
            type="text"
            name="phone"
            value={formData.contactInfo.phone || ""}
            onChange={(e) => {
              const updatedContactInfo = {
                ...formData.contactInfo,
                phone: e.target.value,
              };
              const updatedData = {
                ...formData,
                contactInfo: updatedContactInfo,
              };
              setFormData(updatedData);
              onUpdate(updatedData);
            }}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label>Address</label>
          <Input
            type="text"
            name="address"
            value={formData.contactInfo.address || ""}
            onChange={(e) => {
              const updatedContactInfo = {
                ...formData.contactInfo,
                address: e.target.value,
              };
              const updatedData = {
                ...formData,
                contactInfo: updatedContactInfo,
              };
              setFormData(updatedData);
              onUpdate(updatedData);
            }}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Birth Date */}
        <div className="mb-4">
          <label>Birth Date</label>
          <Input
            type="date"
            name="birthDate"
            value={formData.birthDate || ""}
            onChange={(e) => {
              const updatedData = { ...formData, birthDate: e.target.value };
              setFormData(updatedData);
              onUpdate(updatedData);
            }}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Summary */}
        <div className="mb-4">
          <label>Summary</label>
          <textarea
            name="summary"
            value={formData.summary || ""}
            onChange={(e) => {
              const updatedData = { ...formData, summary: e.target.value };
              setFormData(updatedData);
              onUpdate(updatedData);
            }}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Languages */}
        <div className="mb-4">
          <label>Languages</label>
          {formData.languages.map((language, index) => (
            <div key={index} className="flex mb-2">
              <Input
                type="text"
                value={language}
                onChange={(e) => {
                  const updatedLanguages = formData.languages.map((lang, i) =>
                    i === index ? e.target.value : lang
                  );
                  setFormData({ ...formData, languages: updatedLanguages });
                  onUpdate({ ...formData, languages: updatedLanguages });
                }}
                placeholder="Language"
                className="p-2 border rounded mr-2"
              />
              <Button
                onClick={() => {
                  const updatedLanguages = formData.languages.filter(
                    (_, i) => i !== index
                  );
                  setFormData({ ...formData, languages: updatedLanguages });
                  onUpdate({ ...formData, languages: updatedLanguages });
                }}
                className="ml-2 bg-red-500 text-white py-0 px-2 text-xs"
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            onClick={() =>
              setFormData({
                ...formData,
                languages: [...formData.languages, ""],
              })
            }
            className="text-blue-500"
          >
            + Add Language
          </Button>
        </div>

        {/* Education */}
        <div className="mb-4">
          <label>Education</label>
          {formData.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <Input
                type="text"
                value={edu.institution || ""}
                onChange={(e) => {
                  const updatedEducation = formData.education.map((item, idx) =>
                    idx === index
                      ? { ...item, institution: e.target.value }
                      : item
                  );
                  const updatedData = {
                    ...formData,
                    education: updatedEducation,
                  };
                  setFormData(updatedData);
                  onUpdate(updatedData);
                }}
                placeholder="Institution"
                className="w-full p-2 border rounded mb-2"
              />
              <Input
                type="text"
                value={edu.degree || ""}
                onChange={(e) => {
                  const updatedEducation = formData.education.map((item, idx) =>
                    idx === index ? { ...item, degree: e.target.value } : item
                  );
                  const updatedData = {
                    ...formData,
                    education: updatedEducation,
                  };
                  setFormData(updatedData);
                  onUpdate(updatedData);
                }}
                placeholder="Degree"
                className="w-full p-2 border rounded mb-2"
              />
              <div className="flex mb-2">
                <Input
                  type="date"
                  value={edu.startDate || ""}
                  onChange={(e) => {
                    const updatedEducation = formData.education.map(
                      (item, idx) =>
                        idx === index
                          ? { ...item, startDate: e.target.value }
                          : item
                    );
                    const updatedData = {
                      ...formData,
                      education: updatedEducation,
                    };
                    setFormData(updatedData);
                    onUpdate(updatedData);
                  }}
                  placeholder="Start Date"
                  className="w-1/2 p-2 border rounded mr-2"
                />
                <Input
                  type="date"
                  value={edu.endDate || ""}
                  onChange={(e) => {
                    const updatedEducation = formData.education.map(
                      (item, idx) =>
                        idx === index
                          ? { ...item, endDate: e.target.value }
                          : item
                    );
                    const updatedData = {
                      ...formData,
                      education: updatedEducation,
                    };
                    setFormData(updatedData);
                    onUpdate(updatedData);
                  }}
                  placeholder="End Date"
                  className="w-1/2 p-2 border rounded"
                />
              </div>
              <Button
                onClick={() => {
                  const updatedEducation = formData.education.filter(
                    (_, i) => i !== index
                  );
                  setFormData({ ...formData, education: updatedEducation });
                  onUpdate({ ...formData, education: updatedEducation });
                }}
                className="ml-2 bg-red-500 text-white py-0 px-2 text-xs"
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            onClick={() =>
              setFormData({
                ...formData,
                education: [
                  ...formData.education,
                  { institution: "", degree: "", startDate: "", endDate: "" },
                ],
              })
            }
            className="text-blue-500"
          >
            + Add Education
          </Button>
        </div>

        {/* Experience */}
        <div className="mb-4">
          <label>Experience</label>
          {formData.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <Input
                type="text"
                value={exp.jobTitle || ""}
                onChange={(e) => {
                  const updatedExperience = formData.experience.map(
                    (expItem, i) =>
                      i === index
                        ? { ...expItem, jobTitle: e.target.value }
                        : expItem
                  );
                  setFormData({ ...formData, experience: updatedExperience });
                  onUpdate({ ...formData, experience: updatedExperience });
                }}
                placeholder="Job Title"
                className="w-full p-2 border rounded mb-2"
              />
              <Input
                type="text"
                value={exp.company || ""}
                onChange={(e) => {
                  const updatedExperience = formData.experience.map(
                    (expItem, i) =>
                      i === index
                        ? { ...expItem, company: e.target.value }
                        : expItem
                  );
                  setFormData({ ...formData, experience: updatedExperience });
                  onUpdate({ ...formData, experience: updatedExperience });
                }}
                placeholder="Company"
                className="w-full p-2 border rounded mb-2"
              />
              <div className="flex mb-2">
                <Input
                  type="date"
                  value={exp.startDate || ""}
                  onChange={(e) => {
                    const updatedExperience = formData.experience.map(
                      (expItem, i) =>
                        i === index
                          ? { ...expItem, startDate: e.target.value }
                          : expItem
                    );
                    setFormData({ ...formData, experience: updatedExperience });
                    onUpdate({ ...formData, experience: updatedExperience });
                  }}
                  placeholder="Start Date"
                  className="w-1/2 p-2 border rounded mr-2"
                />
                <Input
                  type="date"
                  value={exp.endDate || ""}
                  onChange={(e) => {
                    const updatedExperience = formData.experience.map(
                      (expItem, i) =>
                        i === index
                          ? { ...expItem, endDate: e.target.value }
                          : expItem
                    );
                    setFormData({ ...formData, experience: updatedExperience });
                    onUpdate({ ...formData, experience: updatedExperience });
                  }}
                  placeholder="End Date"
                  className="w-1/2 p-2 border rounded"
                />
              </div>
              <textarea
                value={exp.description || ""}
                onChange={(e) => {
                  const updatedExperience = formData.experience.map(
                    (expItem, i) =>
                      i === index
                        ? { ...expItem, description: e.target.value }
                        : expItem
                  );
                  setFormData({ ...formData, experience: updatedExperience });
                  onUpdate({ ...formData, experience: updatedExperience });
                }}
                placeholder="Description"
                className="w-full p-2 border rounded"
              />
              <Button
                onClick={() => {
                  const updatedExperience = formData.experience.filter(
                    (_, i) => i !== index
                  );
                  setFormData({ ...formData, experience: updatedExperience });
                  onUpdate({ ...formData, experience: updatedExperience });
                }}
                className="ml-2 bg-red-500 text-white py-0 px-2 text-xs"
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            onClick={() =>
              setFormData({
                ...formData,
                experience: [
                  ...formData.experience,
                  {
                    jobTitle: "",
                    company: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                  },
                ],
              })
            }
            className="text-blue-500"
          >
            + Add Experience
          </Button>
        </div>

        {/* Skills */}
        <div className="mb-4">
          <label>Skills</label>
          {formData.skills.map((skill, index) => (
            <div key={index} className="flex mb-2">
              <Input
                type="text"
                value={skill || ""}
                onChange={(e) => {
                  const updatedSkills = formData.skills.map((sk, i) =>
                    i === index ? e.target.value : sk
                  );
                  setFormData({ ...formData, skills: updatedSkills });
                  onUpdate({ ...formData, skills: updatedSkills });
                }}
                placeholder="Skill"
                className="p-2 border rounded mr-2"
              />
              <Button
                onClick={() => {
                  const updatedSkills = formData.skills.filter(
                    (_, i) => i !== index
                  );
                  setFormData({ ...formData, skills: updatedSkills });
                  onUpdate({ ...formData, skills: updatedSkills });
                }}
                className="ml-2 bg-red-500 text-white py-0 px-2 text-xs"
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            onClick={() =>
              setFormData({ ...formData, skills: [...formData.skills, ""] })
            }
            className="text-blue-500"
          >
            + Add Skill
          </Button>
        </div>

        {/* Save Button */}
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-blue-500 text-white"
        >
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </div>
    </>
  );
};

export default ResumeForm;
