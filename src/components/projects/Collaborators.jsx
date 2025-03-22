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
    id="chatBg"
    className={`absolute inset-y-0 border-r border-r-slate-700 left-0 w-full overflow-hidden bg-black/95 shadow-xl transform transition-transform duration-300 ease-in-out ${
      showSidePanel ? "translate-x-0" : "-translate-x-full"
    } z-50`}
    style={{
      backgroundImage:
        "radial-gradient(circle at center, rgba(30, 64, 175, 0.05) 0%, rgba(0, 0, 0, 0.95) 100%)",
    }}
  >
    {/* Subtle gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 to-black/20 pointer-events-none" />

    <header className="relative p-4 bg-black/60 backdrop-blur-sm border-b border-blue-500/20 flex justify-between items-center">
      <h1 className="text-xl font-bold text-white flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center">
          <span className="text-white font-semibold text-sm">C</span>
        </div>
        Collaborators
      </h1>
      <button
        onClick={() => setShowSidePanel(false)}
        className="p-1.5 hover:bg-blue-800/30 rounded-full transition-all duration-200"
      >
        <RiCloseLine className="text-2xl text-white hover:text-blue-400" />
      </button>
    </header>

    <div className="relative p-4 space-y-3 overflow-y-auto h-[calc(100vh-4rem)]">
      {project?.members?.map(
        (member, index) =>
          member.user !== null && (
            <div
              key={member?.user?._id}
              className="group relative"
              style={{
                zIndex: openDropdownId === member?.user?._id ? 20 : 10 - index,
              }}
            >
              <div className="absolute inset-0 bg-blue-800/10 rounded-xl blur-sm transform group-hover:scale-105 transition-transform duration-300" />
              <div className="relative p-4 rounded-xl border border-blue-500/20 backdrop-blur-sm bg-zinc-900/70 transition-all duration-300 hover:border-blue-500/40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {member?.user?.email.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-white">
                        {member?.user?.email}
                      </span>
                      <span className="text-xs px-2 py-1 bg-blue-800/80 text-blue-100 rounded-full mt-1 w-fit border border-blue-500/30">
                        {member.role}
                      </span>
                    </div>
                  </div>

                  <div className="relative">
                    <button
                      onClick={() => handleDropdownToggle(member?.user?._id)}
                      className="p-2 hover:bg-blue-800/30 rounded-full transition-all duration-200"
                    >
                      <RiMore2Fill className="text-xl text-white" />
                    </button>

                    {openDropdownId === member?.user?._id && (
                      <div
                        className="absolute right-0 mt-2 w-48 bg-zinc-900/95 border border-blue-500/20 rounded-xl shadow-lg backdrop-blur-sm overflow-hidden"
                        style={{ zIndex: 30 }}
                      >
                        <button
                          onClick={() => {
                            handleMakeAdmin(member.user._id);
                            handleDropdownToggle(null);
                          }}
                          disabled={
                            makingUserAdmin &&
                            makingAdminUserId === member?.user?._id
                          }
                          className="w-full px-4 py-3 text-sm text-white hover:bg-blue-800/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between"
                        >
                          <span>Make Admin</span>
                          {makingUserAdmin &&
                            makingAdminUserId === member.user._id && (
                              <div className="flex space-x-1">
                                <div
                                  className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"
                                  style={{ animationDelay: "0s" }}
                                />
                                <div
                                  className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.2s" }}
                                />
                                <div
                                  className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.4s" }}
                                />
                              </div>
                            )}
                        </button>
                        <button
                          onClick={() => {
                            handleRemoveUser(member?.user?._id);
                            handleDropdownToggle(null);
                          }}
                          disabled={
                            removingUser && removingUserId === member?.user?._id
                          }
                          className="w-full px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between"
                        >
                          <span>Remove User</span>
                          {removingUser &&
                            removingUserId === member?.user?._id && (
                              <div className="flex space-x-1">
                                <div
                                  className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce"
                                  style={{ animationDelay: "0s" }}
                                />
                                <div
                                  className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.2s" }}
                                />
                                <div
                                  className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.4s" }}
                                />
                              </div>
                            )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
      )}
    </div>
  </div>
);

export default Collaborators;
