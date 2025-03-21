import React from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { FiUsers } from "react-icons/fi";

export const ProjectHeader = ({ setShowModal, setShowSidePanel }) => (
  <header
    className="relative p-2 bg-black backdrop-blur-sm border-b border-slate-700"

  >
    {/* Subtle gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 to-black/20 pointer-events-none" />

    <div className="relative flex justify-between items-center">
      <button
        onClick={() => setShowModal(true)}
        className="group relative"
      >
        <div className="absolute inset-0 bg-blue-800/10 rounded-xl blur-sm transform group-hover:scale-105 transition-transform duration-300" />
        <div className="relative flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-blue-500/20 backdrop-blur-sm bg-zinc-900/70 text-white transition-all duration-300 hover:border-blue-500/40">
          <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center">
            <IoMdPersonAdd className="text-xl transition-transform duration-300 group-hover:scale-110" />
          </div>
          <span className="font-medium">Add Collaborator</span>
        </div>
      </button>

      <button
        onClick={() => setShowSidePanel(true)}
        className="group relative"
      >
        <div className="absolute inset-0 bg-blue-800/10 rounded-full blur-sm transform group-hover:scale-105 transition-transform duration-300" />
        <div className="relative p-3 rounded-full border border-blue-500/20 backdrop-blur-sm bg-zinc-900/70 transition-all duration-300 hover:border-blue-500/40">
          <FiUsers className="text-white text-xl transition-all duration-300 group-hover:text-blue-400 group-hover:scale-110" />
        </div>
      </button>
    </div>
  </header>
);