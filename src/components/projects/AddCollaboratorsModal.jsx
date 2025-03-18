import React from "react";
import { useFetchAllUsers } from "../../hooks/users/useFetchAllUsers";
import { motion } from "framer-motion";

export const AddCollaboratorsModal = ({
  showModal,
  setShowModal,
  selectedUserId,
  handleUserSelection,
  handleAddCollaborators,
  isAddingCollaborators,
  users,
}) =>
  showModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        <div className="p-6 space-y-6">
          <div className="pb-2 border-b border-purple-100">
            <h2 className="text-xl font-bold text-purple-900 text-center">
              Add Collaborators
            </h2>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {users?.map((user) => (
              <button
                key={user.email}
                onClick={() => handleUserSelection(user._id)}
                className={`w-full p-3 text-left rounded-lg transition-all duration-200 ${
                  selectedUserId.includes(user._id)
                    ? "bg-purple-600 text-white"
                    : "hover:bg-purple-50 text-purple-900"
                }`}
              >
                {user.email}
              </button>
            ))}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleAddCollaborators}
              disabled={selectedUserId.length === 0 || isAddingCollaborators}
              className="flex-1 py-2.5 px-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-purple-600 transition-all disabled:opacity-50"
            >
              {isAddingCollaborators ? "Adding..." : "Add Collaborators"}
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="flex-1 py-2.5 px-4 bg-gray-100 text-gray-600 rounded-lg font-semibold hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
