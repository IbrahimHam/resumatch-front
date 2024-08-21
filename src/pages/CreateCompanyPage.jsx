import React, { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import CustomSelect from "@/components/ui/CustomSelect";

const CreateCompanyPage = () => {
  const { user, token, updateUser } = React.useContext(AuthContext);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
    location: "",
    website: "",
    employeesNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.description ||
      !formData.location ||
      !formData.employeesNumber
    ) {
      setError("Please fill in all required fields.");
      return false;
    }
    if (!formData.image) {
      setError("Please upload an image.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("image", formData.image);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("website", formData.website);
    formDataToSend.append("employeesNumber", formData.employeesNumber);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/company`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedUser = { ...user, company_id: response.data.data._id };
      updateUser(updatedUser);

      toast.success("Company created successfully!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create company.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900 pt-20">
      <Toaster position="top-center" />
      {/* Left side */}
      <div className="w-1/3 bg-white dark:bg-slate-800 p-8 shadow-lg rounded-lg mr-2 space-y-9">
        <h2 className="text-xl font-semibold mb-4">Company Details</h2>
        <p>
          <strong>Name:</strong> {formData.name || "Not provided"}
        </p>
        <p>
          <strong>Description:</strong> {formData.description || "Not provided"}
        </p>
        <p>
          <strong>Location:</strong> {formData.location || "Not provided"}
        </p>
        <p>
          <strong>Website:</strong> {formData.website || "Not provided"}
        </p>
        <p>
          <strong>Employees:</strong>
          {formData.employeesNumber || "Not provided"}
        </p>
        {formData.image && (
          <div>
            <strong>Image:</strong>
            <img
              src={URL.createObjectURL(formData.image)}
              alt="Company Preview"
              className="mt-2 max-h-32"
            />
          </div>
        )}
      </div>
      {/* Right side */}
      <div className="flex-1 p-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Create a Company</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          encType="multipart/form-data"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Company Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              type="text"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full border-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full border-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              name="website"
              type="text"
              value={formData.website}
              onChange={handleInputChange}
              className="w-full border-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Company Image</Label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="employeesNumber">Number of Employees</Label>
            <CustomSelect
              options={["0-50", "50-100", "More than 100"]}
              value={formData.employeesNumber}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, employeesNumber: value }))
              }
              placeholder="Select Employees Number"
            />
          </div>

          {error && <div className="text-red-500">{error}</div>}

          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Creating Company..." : "Create Company"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateCompanyPage;
