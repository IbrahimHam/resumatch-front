import React from "react";

const TemplateFive = ({ data }) => {
  return (
    <div className="max-w-6xl mx-auto bg-gradient-to-br from-yellow-50 to-orange-50 p-8 shadow-xl rounded-lg">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-black text-orange-800 mb-2">
          {data.name}
        </h1>
        <p className="text-2xl text-yellow-700">{data.title}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <main className="md:col-span-2 space-y-6">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-orange-700 mb-4">Profile</h2>
            <p className="text-gray-700 leading-relaxed">{data.summary}</p>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-orange-700 mb-4">
              Employment
            </h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-xl font-semibold text-yellow-700">
                  {exp.jobTitle}
                </h3>
                <p className="text-lg text-orange-600">{exp.company}</p>
                <p className="text-sm text-gray-600 mb-2">
                  {exp.startDate} - {exp.endDate}
                </p>
                <p className="text-gray-700 break-words">{exp.description}</p>
              </div>
            ))}
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-orange-700 mb-4">
              Education
            </h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-xl font-semibold text-yellow-700">
                  {edu.institution}
                </h3>
                <p className="text-gray-700">{edu.degree}</p>
                <p className="text-sm text-gray-600">
                  {edu.startDate} - {edu.endDate}
                </p>
              </div>
            ))}
          </section>
        </main>

        <aside className="md:col-span-1 space-y-6">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-orange-700 mb-4">Contact</h2>
            <ul className="space-y-3">
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 mr-3 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
                {data.contactInfo.email}
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 mr-3 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
                {data.contactInfo.phone}
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 mr-3 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                {data.contactInfo.address}
              </li>
            </ul>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-orange-700 mb-4">
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

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-orange-700 mb-4">Skills</h2>
            <ul className="space-y-2">
              {data.skills.map((skill, index) => (
                <li key={index} className="text-gray-700">
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default TemplateFive;
