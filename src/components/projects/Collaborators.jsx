import React from "react";
import { RiCloseLine, RiMore2Fill } from "react-icons/ri";

export const Collaborators = ({
  project,
  showSidePanel,
  setShowSidePanel,
  openDropdownId,
  handleDropdownToggle,
  handleMakeAdmin,
  handleRemoveUser,
  makingAdminUserId,
  makingUserAdmin,
  removingUserId,
  removingUser,
}) => (
  <div
    className={`absolute inset-y-0 left-0 w-[30%] overflow-hidden bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
      showSidePanel ? "translate-x-0" : "-translate-x-full"
    } z-50`}
  >
    <header className="p-4 bg-gradient-to-r from-purple-700 to-purple-600 flex justify-between items-center">
      <h1 className="text-xl font-bold text-white">Collaborators</h1>
      <button
        onClick={() => setShowSidePanel(false)}
        className="p-1.5 hover:bg-white/10 rounded-full transition-colors duration-200"
      >
        <RiCloseLine className="text-2xl text-white hover:text-purple-200" />
      </button>
    </header>

    <div className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-4rem)]">
      {project?.members?.map((member) => (
        <div
          key={member.user._id}
          className="group p-3 rounded-lg border border-purple-50 hover:border-purple-100 bg-white hover:bg-purple-50 transition-all duration-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-purple-900">{member.user.email}</span>
              <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full mt-1 w-fit">
                {member.role}
              </span>
            </div>

            {member.role !== "admin" && (
              <div className="relative">
                <button
                  onClick={() => handleDropdownToggle(member.user._id)}
                  className="p-1 hover:bg-purple-100 rounded-full transition-colors duration-200"
                >
                  <RiMore2Fill className="text-xl text-purple-600" />
                </button>

                {openDropdownId === member.user._id && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-purple-100 rounded-lg shadow-lg z-10">
                    <button
                      onClick={() => {
                        handleMakeAdmin(member.user._id);
                        handleDropdownToggle(null);
                      }}
                      disabled={makingUserAdmin && makingAdminUserId === member.user._id}
                      className="w-full px-4 py-2 text-sm text-purple-900 hover:bg-purple-50 transition-colors disabled:opacity-50"
                    >
                      {makingUserAdmin && makingAdminUserId === member.user._id ? "Updating..." : "Make Admin"}
                    </button>
                    <button
                      onClick={() => {
                        handleRemoveUser(member.user._id);
                        handleDropdownToggle(null);
                      }}
                      disabled={removingUser && removingUserId === member.user._id}
                      className="w-full px-4 py-2 text-sm text-purple-900 hover:bg-purple-50 transition-colors disabled:opacity-50"
                    >
                      {removingUser && removingUserId === member.user._id ? "Removing..." : "Remove User"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);
