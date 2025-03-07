import React, { useEffect, useState, useRef } from "react";
import { FiUsers } from "react-icons/fi";
import { IoIosSend } from "react-icons/io";
import { IoMdPersonAdd } from "react-icons/io";
import { RiCloseLine, RiMore2Fill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import MarkDown from "markdown-to-jsx";
import { useFetchProjectById } from "../hooks/projects/useFetchProjectById";
import { useFetchAllUsers } from "../hooks/users/useFetchAllUsers";
import { useAddCollaborators } from "../hooks/users/useAddCollaborators";
import { useCurrentUser } from "../hooks/users/useCurrentUser";
import { useRemoveUserFromProject } from "../hooks/projects/useRemoveUserFromProject";
import { useSocket } from "../hooks/useSocket";
import { useExitProject } from "../hooks/projects/useExitProject";
import { useMakeUserAdmin } from "../hooks/users/useMakeUserAdmin";
import { useDeleteProject } from "../hooks/projects/useDeleteProject";

const Project = () => {
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState([]);
  const [messages, setMessages] = useState([]);
  const [aiResponses, setAiResponses] = useState([]);
  const [removingUserId, setRemovingUserId] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [makingAdminUserId, setMakingAdminUserId] = useState(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const { id: projectId } = useParams();
  const userId = localStorage.getItem("userId");

  // Fetch project
  const {
    data: project,
    isLoading: isProjectLoading,
    error: projectError,
  } = useFetchProjectById(projectId);

  // Fetch all users
  const {
    data: users,
    isLoading: isUsersLoading,
    error: usersError,
  } = useFetchAllUsers();

  // Fetch current user
  const { data: userData } = useCurrentUser(userId);

  // Add collaborators mutation
  const { mutate: addCollaborators, isLoading: isAddingCollaborators } =
    useAddCollaborators(projectId);

  // Make user admin mutation
  const { mutate: makeAdmin, isPending: makingUserAdmin } = useMakeUserAdmin({
    projectId,
  });

  // Remove user mutation
  const {
    mutate: removeUser,
    isPending: removingUser,
    error: errorRemovingUser,
  } = useRemoveUserFromProject({ projectId });

  const { deleteTheProject, errorDeletingTheProject, isdeletingTheProject } =
    useDeleteProject();

  // Exit project mutation
  const {
    mutate: exitProject,
    isPending: exitingProject,
    error: errorExitingProject,
  } = useExitProject();

  // Handle incoming messages
  const handleIncomingMessage = (data) => {
    if (data.sender === "AI") {
      setAiResponses((prev) => [...prev, data]);
    } else {
      setMessages((prev) => [...prev, data]);
    }
  };

  // Initialize socket
  const { sendMessage } = useSocket(projectId, handleIncomingMessage);

  // Scroll to the bottom of the messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, aiResponses]);

  // Handle user selection for collaborators
  const handleUserSelection = (userId) => {
    setSelectedUserId((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  // Handle adding collaborators
  const handleAddCollaborators = async () => {
    try {
      await addCollaborators(selectedUserId);
      setShowModal(false);
      setSelectedUserId([]);
    } catch (err) {
      console.error("Error adding collaborators:", err);
    }
  };

  // Dropdown handler
  const handleDropdownToggle = (userId) => {
    setOpenDropdownId((prev) => (prev === userId ? null : userId));
  };

  // Make Admin handler
  const handleMakeAdmin = (userId) => {
    setMakingAdminUserId(userId);
    makeAdmin(
      { userId },
      {
        onSettled: () => setMakingAdminUserId(null),
      }
    );
  };

  // Remove User handler
  const handleRemoveUser = (userId) => {
    setRemovingUserId(userId);
    removeUser(userId, {
      onSettled: () => setRemovingUserId(null),
    });
  };

  // Handle exiting the project
  const handleExitProject = (e) => {
    e.preventDefault();
    exitProject(projectId);
  };

  // Handle Delete The project
  const handleDeleteProject = (projectId) => {
    deleteTheProject(projectId);
  };

  // Send a message
  const send = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = {
      message: inputValue,
      sender: userData,
      projectId,
    };

    setMessages((prev) => [...prev, newMessage]);
    sendMessage("project-message", newMessage);
    setInputValue("");
  };

  // Handle back button click
  const handleBackButton = () => {
    navigate("/");
  };

  return (
    <main className="h-screen w-screen flex">
      {/* Left Section: Chat */}
      <section className="relative w-[30%] bg-gray-200 flex flex-col">
        {/* Header */}
        <header className="p-2 px-4 flex justify-between items-center bg-purple-700">
          <button
            onClick={() => setShowModal(true)}
            className="text-white font-bold flex gap-2 items-center"
          >
            <IoMdPersonAdd />
            Add Collaborator
          </button>
          <button
            onClick={() => setShowSidePanel(true)}
            className="p-2 bg-purple-400 rounded-full"
          >
            <FiUsers className="text-white" size={20} />
          </button>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {isProjectLoading ? (
            <p className="text-center text-gray-500">Loading messages...</p>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender?._id === userData?._id
                    ? "justify-end"
                    : "justify-start"
                } mb-4`}
              >
                <div
                  className={`p-3 rounded-md max-w-[75%] ${
                    msg.sender?._id === userData?._id
                      ? "bg-purple-600 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  <small className="block mb-1">~ {msg.sender?.email}</small>
                  <p>{msg.message}</p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Box */}
        <div className="p-4 flex items-center gap-2 bg-gray-100">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className="w-full p-2 rounded-md border outline-none focus:ring-2 focus:ring-purple-500"
            onKeyDown={(e) => e.key === "Enter" && send(e)}
          />
          <button
            onClick={send}
            disabled={!inputValue.trim()}
            className={`p-2 rounded-md ${
              inputValue.trim()
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "bg-gray-300 text-gray-500"
            }`}
          >
            <IoIosSend size={22} />
          </button>
        </div>

        {/* Side Panel: Collaborators */}
        <div
          className={`sidePanel w-full h-full flex flex-col gap-2 bg-gray-200 absolute transition-all ${
            showSidePanel ? "translate-x-0" : "-translate-x-full"
          } top-0`}
        >
          <header className="flex justify-between items-center px-4 p-2 bg-purple-600">
            <h1 className="font-semibold text-white text-lg">Collaborators</h1>
            <button
              onClick={() => setShowSidePanel(!showSidePanel)}
              className="p-2 text-white bg-purple-400 rounded-full"
            >
              <RiCloseLine />
            </button>
          </header>

          <div className="users flex flex-col gap-2">
            {project?.members?.map((member) => (
              <div
                key={member.user._id}
                className="user hover:bg-slate-100 p-2 flex gap-2 items-center"
              >
                {/* User info */}
                <div className="flex-1">
                  {member.user.email}
                  <span className="text-sm px-2 py-1 bg-green-500 rounded-xl text-white">
                    {member.role}
                  </span>
                </div>

                {member.role !== "admin" && (
                  <div className="relative">
                    <button
                      onClick={() => handleDropdownToggle(member.user._id)}
                      className="p-1 hover:bg-gray-200 rounded-lg"
                    >
                      <RiMore2Fill />
                    </button>

                    {openDropdownId === member.user._id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg z-10">
                        <button
                          onClick={() => {
                            handleMakeAdmin(member.user._id);
                            setOpenDropdownId(null);
                          }}
                          disabled={
                            makingUserAdmin &&
                            makingAdminUserId === member.user._id
                          }
                          className="block w-full px-4 py-2 text-sm hover:bg-gray-100 disabled:opacity-50"
                        >
                          {makingUserAdmin &&
                          makingAdminUserId === member.user._id
                            ? "Updating..."
                            : "Make Admin"}
                        </button>
                        <button
                          onClick={() => {
                            handleRemoveUser(member.user._id);
                            setOpenDropdownId(null);
                          }}
                          disabled={
                            removingUser && removingUserId === member.user._id
                          }
                          className="block w-full px-4 py-2 text-sm hover:bg-gray-100 disabled:opacity-50"
                        >
                          {removingUser && removingUserId === member.user._id
                            ? "Removing..."
                            : "Remove User"}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Right Section: AI Responses */}
      <section className="w-full md:w-[70%] bg-white flex flex-col gap-4">
        <div className="flex justify-between bg-zinc-800 p-4 items-center">
          <button
            onClick={handleBackButton}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-800 rounded-lg text-white"
          >
            Back
          </button>
          <h1 className="text-2xl font-bold text-white">AI Responses</h1>
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={handleExitProject}
              className="px-4 py-2 bg-red-500 hover:bg-red-700 rounded-lg text-white"
            >
              {exitingProject ? "Exiting..." : "Exit Project"}
            </button>
            <button
              onClick={() => handleDeleteProject(projectId)}
              className="px-4 py-2 bg-red-500 hover:bg-red-700 rounded-lg text-white"
            >
              {exitingProject ? "Deleting..." : "Delete Project"}
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-4">
          {aiResponses.map((res, idx) => (
            <div key={idx} className="p-3 bg-yellow-100 rounded-xl mb-2">
              <small className="block mb-1">~ AI</small>
              <MarkDown>{res.message}</MarkDown>
            </div>
          ))}
        </div>
      </section>

      {/* Modal: Add Collaborators */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-[90%] space-y-4 max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Add Collaborator
            </h2>
            <div className="space-y-3 max-h-72 px-2 overflow-y-auto">
              {users?.map((user) => (
                <button
                  key={user.email}
                  onClick={() => handleUserSelection(user._id)}
                  className={`flex w-full items-center justify-between p-2 rounded-md border-2 hover:bg-gray-200 ${
                    selectedUserId.includes(user._id) ? "bg-gray-300" : ""
                  }`}
                >
                  {user.email}
                </button>
              ))}
            </div>
            <div className="flex justify-around gap-2">
              <button
                onClick={handleAddCollaborators}
                disabled={selectedUserId.length === 0 || isAddingCollaborators}
                className="w-full py-2 text-white font-semibold rounded-md bg-purple-600"
              >
                {isAddingCollaborators ? "Adding..." : "Add Collaborators"}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-2 text-white font-semibold rounded-md bg-purple-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Project;
