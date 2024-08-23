import React from "react";

const Modal = ({ toggleModal, children }) => {
  const handleClickOutside = (e) => {
    if (e.target.id === "modal-container") {
      toggleModal();
    }
  };

  return (
    <div
      id="modal-container"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleClickOutside}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 h-5/6 max-w-6xl overflow-y-auto relative">
        <button
          onClick={toggleModal}
          className="text-white font-bold absolute top-3 right-3 w-8 h-8 bg-red-500 rounded-full"
        >
          &#10005;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
