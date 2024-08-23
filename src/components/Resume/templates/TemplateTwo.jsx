import React from "react";

const TemplateTwo = ({ data }) => {
  return (
    <div className="max-w-6xl mx-auto bg-gradient-to-r from-green-50 to-teal-50 p-8 shadow-xl rounded-lg">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-teal-800">{data.name}</h1>
          <p className="text-xl text-green-600">{data.title}</p>
        </div>
        <div className="text-right">
          <p className="text-teal-700">{data.contactInfo.email}</p>
          <p className="text-teal-700">{data.contactInfo.phone}</p>
          <p className="text-teal-700">{data.contactInfo.address}</p>
        </div>
      </header>

      <main className="space-y-6">
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-teal-700 mb-3">Profile</h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </section>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-6">
            <section className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold text-teal-700 mb-3">
                Employment
              </h2>
              {data.experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-xl font-semibold text-green-700">
                    {exp.jobTitle}
                  </h3>
                  <p className="text-lg text-teal-600">{exp.company}</p>
                  <p className="text-sm text-gray-600 mb-2">
                    {exp.startDate} - {exp.endDate}
                  </p>
                  <p className="text-gray-700 break-words">{exp.description}</p>
                </div>
              ))}
            </section>
            <section className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold text-teal-700 mb-3">Skills</h2>
              <ul className="space-y-2">
                {data.skills.map((skill, index) => (
                  <li key={index} className="text-gray-700">
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="space-y-6">
            <section className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold text-teal-700 mb-3">
                Education
              </h2>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-xl font-semibold text-green-700">
                    {edu.institution}
                  </h3>
                  <p className="text-gray-700">{edu.degree}</p>
                  <p className="text-sm text-gray-600">
                    {edu.startDate} - {edu.endDate}
                  </p>
                </div>
              ))}
            </section>

            <section className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold text-teal-700 mb-3">
                Languages
              </h2>
              <ul className="space-y-2">
                {data.languages.map((lang, index) => (
                  <li key={index} className="text-gray-700">
                    {lang}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TemplateTwo;
