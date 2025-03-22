import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { Search } from "lucide-react";

export const AddCollaboratorsModal = ({
  showModal,
  setShowModal,
  selectedUserId,
  handleUserSelection,
  handleAddCollaborators,
  isAddingCollaborators,
  users,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = useMemo(() => {
    return users?.filter((user) =>
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  const handleAddCollaboratorsAndReset = () => {
    handleAddCollaborators();
    setSearchQuery("");
  };

  const handleCancel = () => {
    setShowModal(false);
    setSearchQuery("");
  };

  return showModal ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-md overflow-hidden"
      >
        {/* Background blur effect */}
        <div className="absolute inset-0 bg-blue-800/10 rounded-2xl blur-xl transform" />

        {/* Modal content */}
        <div className="relative rounded-2xl border border-blue-500/20 backdrop-blur-sm bg-zinc-900/70">
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-blue-500/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">+</span>
                </div>
                <h2 className="text-xl font-bold text-white">
                  Add Collaborators
                </h2>
              </div>
              <button
                onClick={handleCancel}
                className="p-2 hover:bg-blue-800/30 rounded-full transition-all duration-200"
              >
                <IoClose className="text-xl text-white hover:text-blue-400" />
              </button>
            </div>

            {/* Search bar */}
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-800/10 rounded-xl blur-sm transform group-focus-within:bg-blue-800/20 transition-all duration-300" />
              <div className="relative flex items-center">
                <Search className="absolute left-3 w-5 h-5 text-blue-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by email..."
                  className="w-full py-2.5 pl-10 pr-4 bg-zinc-900/70 border border-blue-500/20 rounded-xl text-white placeholder-blue-400/50 focus:outline-none focus:border-blue-500/40 transition-all duration-300"
                />
              </div>
            </div>

            {/* Users list */}
            <div className="space-y-2 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-800 scrollbar-track-transparent">
              {filteredUsers?.length === 0 ? (
                <div className="text-center py-4 text-gray-400">
                  No users found matching your search
                </div>
              ) : (
                filteredUsers?.map((user) => (
                  <button
                    key={user.email}
                    onClick={() => handleUserSelection(user._id)}
                    className="group relative w-full"
                  >
                    <div
                      className={`absolute inset-0 rounded-xl blur-sm transition-all duration-300 ${
                        selectedUserId.includes(user._id)
                          ? "bg-blue-800/30"
                          : "bg-blue-800/10 group-hover:bg-blue-800/20"
                      }`}
                    />
                    <div
                      className={`relative w-full p-3 rounded-xl border transition-all duration-300 flex items-center gap-3 ${
                        selectedUserId.includes(user._id)
                          ? "border-blue-500/40 bg-blue-900/30 text-white"
                          : "border-blue-500/20 bg-zinc-900/70 text-gray-300 hover:text-white"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {user.email.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="font-medium">{user.email}</span>
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-4 border-t border-blue-500/20">
              <button
                onClick={handleAddCollaboratorsAndReset}
                disabled={selectedUserId.length === 0 || isAddingCollaborators}
                className="relative group flex-1"
              >
                <div className="absolute inset-0 bg-blue-800/20 rounded-xl blur-sm transform group-hover:scale-105 transition-transform duration-300" />
                <div className="relative py-2.5 px-4 rounded-xl border border-blue-500/20 backdrop-blur-sm bg-blue-900/50 text-white font-medium transition-all duration-300 hover:border-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  {isAddingCollaborators ? (
                    <>
                      <span>Adding</span>
                      <div className="flex space-x-1">
                        <div
                          className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
                          style={{ animationDelay: "0s" }}
                        />
                        <div
                          className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                        <div
                          className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        />
                      </div>
                    </>
                  ) : (
                    "Add Collaborators"
                  )}
                </div>
              </button>
              <button
                onClick={handleCancel}
                className="relative group flex-1"
              >
                <div className="absolute inset-0 bg-zinc-800/20 rounded-xl blur-sm transform group-hover:scale-105 transition-transform duration-300" />
                <div className="relative py-2.5 px-4 rounded-xl border border-blue-500/20 backdrop-blur-sm bg-zinc-900/70 text-gray-300 font-medium transition-all duration-300 hover:border-blue-500/40 hover:text-white flex items-center justify-center">
                  Cancel
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  ) : null;
};

export default AddCollaboratorsModal;
