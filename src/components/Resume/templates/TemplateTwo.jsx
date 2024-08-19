const TemplateTwo = ({ data }) => {
  return (
    <div className="p-6 bg-white border border-gray-300 rounded-lg shadow-md">
      <div className="text-black bg-gray-200 p-4 rounded-md">
        <h1 className="text-3xl font-bold">{data.name || "Full Name"}</h1>
        <p className="italic">{data.email || "Email"}</p>
        <p>{data.phone || "Phone Number"}</p>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Languages</h2>
        <ul className="list-disc ml-5">
          {data.languages &&
            data.languages.map((language, index) => (
              <li key={index}>
                <span>
                  {language.name} - {language.level}
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default TemplateTwo;
