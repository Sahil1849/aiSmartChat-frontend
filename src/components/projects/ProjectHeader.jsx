import React from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { FiUsers } from "react-icons/fi";

export const ProjectHeader = ({ setShowModal, setShowSidePanel }) => (
  <header className="p-4 bg-gradient-to-r from-purple-700 to-purple-600 shadow-lg">
    <div className="flex justify-between items-center">
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all duration-300 hover:scale-105 hover:shadow-md"
      >
        <IoMdPersonAdd className="text-xl" />
        <span className="font-semibold">Add Collaborator</span>
      </button>
      
      <button
        onClick={() => setShowSidePanel(true)}
        className="p-2.5 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 hover:rotate-12 hover:scale-110 group"
      >
        <FiUsers className="text-white text-xl group-hover:text-purple-200" />
      </button>
    </div>
  </header>
);
