import React, { useState } from "react";

const ChangeAvatar = () => {
  const [avatar, setAvatar] = useState(null);

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="block mb-4">
        <span className="text-gray-700">Select Avatar</span>
        <input
          type="file"
          onChange={handleAvatarChange}
          className="mt-1 block w-full"
          accept="image/*"
        />
      </label>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Update Avatar
      </button>
    </form>
  );
};

export default ChangeAvatar;
