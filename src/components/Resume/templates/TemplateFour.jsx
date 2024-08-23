import React from "react";

const TemplateFour = ({ data }) => {
  return (
    <div className="w-full mx-auto bg-white p-8 border border-gray-200 shadow-md">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-black">{data.name}</h1>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 bg-blue-50 p-4">
          <h2 className="text-xl font-semibold mb-2 text-black">
            Personal Information
          </h2>
          <p className="text-black">
            <strong>Email:</strong> {data.contactInfo.email}
          </p>
          <p className="text-black">
            <strong>Birthdate:</strong> {data.birthDate}
          </p>
          <p className="text-black">
            <strong>Address:</strong> {data.contactInfo.address}
          </p>
        </div>
        <div className="col-span-2 p-4">
          <h2 className="text-xl font-semibold mb-2 text-black">Profile</h2>
          <p className="text-black">{data.summary}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="col-span-3 bg-blue-100 p-4">
          <h2 className="text-xl font-semibold mb-2 text-black">Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold text-black">{edu.institution}</p>
              <p className="text-sm text-gray-600">{edu.degree}</p>
              <p className="text-sm text-gray-600">
                {edu.startDate} - {edu.endDate}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="col-span-2 bg-blue-100 p-4">
          <h2 className="text-xl font-semibold mb-2 text-black">Employment</h2>
          {data.experience.map((job, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold text-black">
                {job.title} - {job.company}
              </p>
              <p className="text-sm text-gray-600">
                {job.startDate} - {job.endDate}
              </p>
              <p className="text-black break-words">{job.description}</p>
            </div>
          ))}
        </div>
        <div className="col-span-1 bg-blue-50 p-4">
          <h2 className="text-xl font-semibold mb-2 text-black">Languages</h2>
          {data.languages.map((language, index) => (
            <p key={index} className="text-black">
              {language}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateFour;
