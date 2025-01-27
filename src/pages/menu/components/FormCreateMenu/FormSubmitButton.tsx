import React from "react";

const FormSubmitButton: React.FC = () => {
  return (
    <button
      type="submit"
      className="w-full bg-primary70 text-white py-2 rounded-full hover:bg-primary50 transition-all"
    >
      Tambah Menu
    </button>
  );
};

export default FormSubmitButton;
