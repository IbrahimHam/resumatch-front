import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ResumeForm = ({ onUpdate, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    contactInfo: {
      email: "",
      phone: "",
      address: "",
    },
    birthDate: "",
    summary: "",
    languages: [{ name: "", level: "" }],
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
    ...initialData,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...formData,
        ...initialData,
        languages: initialData.languages || [{ name: "", level: "" }],
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    onUpdate({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddLanguage = () => {
    setFormData({
      ...formData,
      languages: [...formData.languages, { name: "", level: "" }],
    });
  };

  const handleLanguageChange = (index, field, value) => {
    const updatedLanguages = formData.languages.map((language, i) =>
      i === index ? { ...language, [field]: value } : language
    );
    setFormData({ ...formData, languages: updatedLanguages });
    onUpdate({ ...formData, languages: updatedLanguages });
  };

  const handleRemoveLanguage = (index) => {
    const updatedLanguages = formData.languages.filter((_, i) => i !== index);
    setFormData({ ...formData, languages: updatedLanguages });
    onUpdate({ ...formData, languages: updatedLanguages });
  };

  const handleAddEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { institution: "", degree: "", startDate: "", endDate: "" },
      ],
    });
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = formData.education.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    setFormData({ ...formData, education: updatedEducation });
    onUpdate({ ...formData, education: updatedEducation });
  };

  const handleRemoveEducation = (index) => {
    const updatedEducation = formData.education.filter((_, i) => i !== index);
    setFormData({ ...formData, education: updatedEducation });
    onUpdate({ ...formData, education: updatedEducation });
  };

  const handleAddExperience = () => {
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
    });
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = formData.experience.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    setFormData({ ...formData, experience: updatedExperience });
    onUpdate({ ...formData, experience: updatedExperience });
  };

  const handleRemoveExperience = (index) => {
    const updatedExperience = formData.experience.filter((_, i) => i !== index);
    setFormData({ ...formData, experience: updatedExperience });
    onUpdate({ ...formData, experience: updatedExperience });
  };

  const handleAddSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, ""],
    });
  };

  const handleSkillChange = (index, value) => {
    const updatedSkills = formData.skills.map((skill, i) =>
      i === index ? value : skill
    );
    setFormData({ ...formData, skills: updatedSkills });
    onUpdate({ ...formData, skills: updatedSkills });
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = formData.skills.filter((_, i) => i !== index);
    setFormData({ ...formData, skills: updatedSkills });
    onUpdate({ ...formData, skills: updatedSkills });
  };

  return (
    <div className="w-full p-4">
      <h3 className="text-xl font-bold mb-4">Resume Form</h3>

      {/* Name */}
      <div className="mb-4">
        <label>Name</label>
        <Input
          type="text"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Summary */}
      <div className="mb-4">
        <label>Summary</label>
        <textarea
          name="summary"
          value={formData.summary || ""}
          onChange={handleChange}
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
              value={language.name || ""}
              onChange={(e) =>
                handleLanguageChange(index, "name", e.target.value)
              }
              placeholder="Language"
              className="p-2 border rounded mr-2"
            />
            <Input
              type="text"
              value={language.level || ""}
              onChange={(e) =>
                handleLanguageChange(index, "level", e.target.value)
              }
              placeholder="Proficiency"
              className="p-2 border rounded"
            />
            <Button
              onClick={() => handleRemoveLanguage(index)}
              className="ml-2 bg-red-500 text-white py-0 px-2 text-xs"
            >
              Remove
            </Button>
          </div>
        ))}
        <Button onClick={handleAddLanguage} className="text-blue-500">
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
              onChange={(e) =>
                handleEducationChange(index, "institution", e.target.value)
              }
              placeholder="Institution"
              className="w-full p-2 border rounded mb-2"
            />
            <Input
              type="text"
              value={edu.degree || ""}
              onChange={(e) =>
                handleEducationChange(index, "degree", e.target.value)
              }
              placeholder="Degree"
              className="w-full p-2 border rounded mb-2"
            />
            <div className="flex justify-between mb-2 space-x-2">
              <div className="w-1/2">
                <span className="text-gray-600 text-sm dark:text-gray-200">
                  Start Date
                </span>
                <Input
                  type="date"
                  value={edu.startDate || ""}
                  onChange={(e) =>
                    handleEducationChange(index, "startDate", e.target.value)
                  }
                  className="w-full p-2 border rounded mb-2"
                />
              </div>
              <div className="w-1/2">
                <span className="text-gray-600 text-sm dark:text-gray-200">
                  End Date
                </span>
                <Input
                  type="date"
                  value={edu.endDate || ""}
                  onChange={(e) =>
                    handleEducationChange(index, "endDate", e.target.value)
                  }
                  className="w-full p-2 border rounded mb-2"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleRemoveEducation(index)}
              className="text-red-500"
            >
              Remove Education
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddEducation}
          className="text-blue-500"
        >
          + Add Education
        </button>
      </div>

      {/* Experience */}
      <div className="mb-4">
        <label>Experience</label>
        {formData.experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <Input
              type="text"
              value={exp.jobTitle || ""}
              onChange={(e) =>
                handleExperienceChange(index, "jobTitle", e.target.value)
              }
              placeholder="Job Title"
              className="w-full p-2 border rounded mb-2"
            />
            <Input
              type="text"
              value={exp.company || ""}
              onChange={(e) =>
                handleExperienceChange(index, "company", e.target.value)
              }
              placeholder="Company"
              className="w-full p-2 border rounded mb-2"
            />
            <Input
              type="date"
              value={exp.startDate || ""}
              onChange={(e) =>
                handleExperienceChange(index, "startDate", e.target.value)
              }
              className="w-full p-2 border rounded mb-2"
            />
            <Input
              type="date"
              value={exp.endDate || ""}
              onChange={(e) =>
                handleExperienceChange(index, "endDate", e.target.value)
              }
              className="w-full p-2 border rounded mb-2"
            />
            <textarea
              value={exp.description || ""}
              onChange={(e) =>
                handleExperienceChange(index, "description", e.target.value)
              }
              placeholder="Description"
              className="w-full p-2 border rounded mb-2"
            />
            <button
              type="button"
              onClick={() => handleRemoveExperience(index)}
              className="text-red-500"
            >
              Remove Experience
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddExperience}
          className="text-blue-500"
        >
          + Add Experience
        </button>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <label>Skills</label>
        {formData.skills.map((skill, index) => (
          <div key={index} className="mb-2">
            <Input
              type="text"
              value={skill || ""}
              onChange={(e) => handleSkillChange(index, e.target.value)}
              placeholder="Skill"
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => handleRemoveSkill(index)}
              className="text-red-500 ml-2"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddSkill}
          className="text-blue-500"
        >
          + Add Skill
        </button>
      </div>
    </div>
  );
};

export default ResumeForm;
