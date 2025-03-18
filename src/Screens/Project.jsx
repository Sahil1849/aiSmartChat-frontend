import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchProjectById } from "../hooks/projects/useFetchProjectById";
import { useFetchAllUsers } from "../hooks/users/useFetchAllUsers";
import { useAddCollaborators } from "../hooks/users/useAddCollaborators";
import { useCurrentUser } from "../hooks/users/useCurrentUser";
import { useRemoveUserFromProject } from "../hooks/projects/useRemoveUserFromProject";
import { useSocket } from "../hooks/useSocket";
import { useExitProject } from "../hooks/projects/useExitProject";
import { useMakeUserAdmin } from "../hooks/users/useMakeUserAdmin";
import { useDeleteProject } from "../hooks/projects/useDeleteProject";
import { ProjectHeader } from "../components/projects/ProjectHeader";
import { Messages } from "../components/projects/Messages";
import { Collaborators } from "../components/projects/Collaborators";
import { AIResponses } from "../components/projects/AiResponse";
import { AddCollaboratorsModal } from "../components/projects/AddCollaboratorsModal";

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
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const { id: projectId } = useParams();
  const userId = localStorage.getItem("userId");

  const { data: project, isLoading: isProjectLoading } =
    useFetchProjectById(projectId);
  const { data: users } = useFetchAllUsers();
  const { data: userData } = useCurrentUser(userId);
  const { mutate: addCollaborators, isLoading: isAddingCollaborators } =
    useAddCollaborators(projectId);
  const { mutate: makeAdmin, isPending: makingUserAdmin } = useMakeUserAdmin({
    projectId,
  });
  const { mutate: removeUser, isPending: removingUser } =
    useRemoveUserFromProject({ projectId });
  const { deleteTheProject, isdeletingTheProject } = useDeleteProject();
  const { mutate: exitProject, isPending: exitingProject } = useExitProject();

  const { sendMessage } = useSocket(projectId, (data) => {
    if (data.sender === "AI") {
      setAiResponses((prev) => [...prev, data]);
      setIsGenerating(false); // Stop generating when AI response arrives
    } else {
      setMessages((prev) => [...prev, data]); // Add normal messages to the messages list
    }
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, aiResponses]);

  const handleUserSelection = (userId) => {
    setSelectedUserId((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleAddCollaborators = async () => {
    try {
      await addCollaborators(selectedUserId);
      setShowModal(false);
      setSelectedUserId([]);
    } catch (err) {
      console.error("Error adding collaborators:", err);
    }
  };

  const handleDropdownToggle = (userId) => {
    setOpenDropdownId((prev) => (prev === userId ? null : userId));
  };

  const handleMakeAdmin = (userId) => {
    setMakingAdminUserId(userId);
    makeAdmin({ userId }, { onSettled: () => setMakingAdminUserId(null) });
  };

  const handleRemoveUser = (userId) => {
    setRemovingUserId(userId);
    removeUser(userId, { onSettled: () => setRemovingUserId(null) });
  };

  const handleExitProject = (e) => {
    e.preventDefault();
    exitProject(projectId);
  };

  const handleDeleteProject = (projectId) => {
    deleteTheProject(projectId);
  };

  const send = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = {
      message: inputValue,
      sender: userData,
      projectId,
      isAI: inputValue.toLowerCase().includes('@ai'), // Add isAI flag
      timestamp: new Date().toLocaleTimeString(),
    };

    // Add the message to the messages list regardless of whether it's AI-tagged
    setMessages((prev) => [...prev, newMessage]);

    // If the message is AI-tagged, show generating state
    if (newMessage.isAI) {
      setIsGenerating(true);
    }

    // Send the message via socket
    sendMessage("project-message", newMessage);
    setInputValue("");
  };

  const handleBackButton = () => {
    navigate("/");
  };

  return (
    <main className="h-screen w-full flex flex-col md:flex-row overflow-hidden bg-white">
      {/* Left Section */}
      <section className="w-full md:w-[30%] bg-gray-50 flex flex-col">
        <ProjectHeader
          setShowModal={setShowModal}
          setShowSidePanel={setShowSidePanel}
        />
        <Messages
          messages={messages}
          userData={userData}
          inputValue={inputValue}
          setInputValue={setInputValue}
          send={send}
          isProjectLoading={isProjectLoading}
          messagesEndRef={messagesEndRef}
        />
        <Collaborators
          project={project}
          showSidePanel={showSidePanel}
          setShowSidePanel={setShowSidePanel}
          openDropdownId={openDropdownId}
          handleDropdownToggle={handleDropdownToggle}
          handleMakeAdmin={handleMakeAdmin}
          handleRemoveUser={handleRemoveUser}
          makingAdminUserId={makingAdminUserId}
          makingUserAdmin={makingUserAdmin}
          removingUserId={removingUserId}
          removingUser={removingUser}
        />
      </section>

      {/* Right Section */}
      <section className="flex-1 flex flex-col min-w-0">
        <div className="flex-shrink-0 bg-gradient-to-r from-purple-700 to-purple-600 p-4">
          <div className="flex justify-between items-center">
            <button
              onClick={handleBackButton}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all duration-300 hover:scale-105"
            >
              Back
            </button>
            <h1 className="text-2xl font-bold text-white">AI Responses</h1>
            <div className="flex justify-center items-center gap-2">
              <button
                onClick={handleExitProject}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white transition-all duration-300 hover:scale-105"
              >
                {exitingProject ? "Exiting..." : "Exit Project"}
              </button>
              <button
                onClick={() => handleDeleteProject(projectId)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white transition-all duration-300 hover:scale-105"
              >
                {isdeletingTheProject ? "Deleting..." : "Delete Project"}
              </button>
            </div>
          </div>
        </div>
        <AIResponses aiResponses={aiResponses} isGenerating={isGenerating} />
      </section>

      {/* Add Collaborators Modal */}
      <AddCollaboratorsModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedUserId={selectedUserId}
        handleUserSelection={handleUserSelection}
        handleAddCollaborators={handleAddCollaborators}
        isAddingCollaborators={isAddingCollaborators}
        users={users}

      />
    </main>
  );
};

export default Project;