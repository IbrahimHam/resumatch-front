const TemplateOne = ({ data }) => {
  return (
    <div className="p-0 bg-gray-50 rounded-md shadow-md">
      <div className="bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold">{data.name || "Your Name"}</h1>
        <p>{data.contactInfo.email || "Email"}</p>
        <p>{data.contactInfo.phone || "Phone"}</p>
        <p>{data.contactInfo.address || "Address"}</p>
        <p>{data.birthDate || "Birth Date"}</p>
        <p>{data.summary || "Summary"}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Experience</h2>
        <ul>
          {data.experience &&
            data.experience.map((exp, index) => (
              <li key={index} className="flex justify-between">
                <span>{exp.jobTitle || "Your Title"}</span>
                <span>{exp.company || "Company"}</span>
                <span>{exp.startDate || "Start Date"}</span>
                <span>{exp.endDate || "End Date"}</span>
                <span>{exp.description || "Description about your job"}</span>
              </li>
            ))}
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Education</h2>
        <ul>
          {data.education &&
            data.education.map((edc, index) => (
              <li key={index} className="flex justify-between">
                <span>{edc.institution || "Language"}</span>
                <span>{edc.degree || "Degree"}</span>
                <span>{edc.startDate || "Start Date"}</span>
                <span>{edc.endDate || "End Date"}</span>
              </li>
            ))}
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Languages</h2>
        <ul>
          {data.languages &&
            data.languages.map((language, index) => (
              <li key={index} className="flex justify-between">
                <span>{language}</span>
              </li>
            ))}
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Skills</h2>
        <ul>
          {data.skills &&
            data.skills.map((skill, index) => (
              <li key={index} className="flex justify-between">
                <span>{skill}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default TemplateOne;
