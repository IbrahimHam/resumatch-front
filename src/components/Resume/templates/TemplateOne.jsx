const TemplateOne = ({ data }) => {
  return (
    <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
      <header className="bg-gray-800 text-white p-8">
        <h1 className="text-4xl font-bold mb-2">{data.name}</h1>
        <p className="text-xl">{data.title}</p>
        <div className="mt-4 flex justify-between">
          <p>{data.contactInfo.email}</p>
          <p>{data.contactInfo.phone}</p>
          <p>{data.contactInfo.address}</p>
        </div>
      </header>

      <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <section className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Profile</h2>
            <p className="text-gray-700">{data.summary}</p>
          </section>

          <section className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Employment
            </h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-xl font-semibold text-gray-700">
                  {exp.jobTitle}
                </h3>
                <p className="text-lg text-gray-600">{exp.company}</p>
                <p className="text-sm text-gray-600">
                  {exp.startDate} - {exp.endDate}
                </p>
                <p className="text-gray-700 mt-2 break-words">
                  {exp.description}
                </p>
              </div>
            ))}
          </section>

          <section className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Education</h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-xl font-semibold text-gray-700">
                  {edu.institution}
                </h3>
                <p className="text-gray-700">{edu.degree}</p>
                <p className="text-sm text-gray-600">
                  {edu.startDate} - {edu.endDate}
                </p>
              </div>
            ))}
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Languages</h2>
            <ul className="list-disc list-inside">
              {data.languages.map((lang, index) => (
                <li key={index} className="text-gray-700">
                  {lang}
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Skills</h2>
            <ul className="list-disc list-inside">
              {data.skills.map((skill, index) => (
                <li key={index} className="text-gray-700">
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TemplateOne;
