import React from "react";

const ConfirmationDialog = ({
  isOpen,
  title,
  description,
  onConfirm,
  onCancel,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  jobData,
  setJobData,
}) => {
  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <p className="mb-4">{description}</p>
        {jobData && jobData.title && (
          <form>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Job Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={jobData.title || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  name="description"
                  value={jobData.description || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  rows="4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={jobData.location || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Job Type
                </label>
                <input
                  type="text"
                  name="jobType"
                  value={jobData.jobType || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Tags
                </label>
                <input
                  type="text"
                  name="tags"
                  value={jobData.tags || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Detailed Requirements
                </label>
                <textarea
                  name="detailedRequirements"
                  value={jobData.detailedRequirements || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  rows="5"
                />
              </div>
            </div>
          </form>
        )}

        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            {cancelLabel}
          </button>
          {jobData ? (
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
            >
              {confirmLabel}
            </button>
          ) : (
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600"
            >
              {confirmLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
