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
import { ArrowLeft, LogOut, Trash2 } from "lucide-react";

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

  const { data: project, isLoading: isProjectLoading } = useFetchProjectById(projectId);
  const { data: users } = useFetchAllUsers();
  const { data: userData } = useCurrentUser(userId);
  const { mutate: addCollaborators, isLoading: isAddingCollaborators } = useAddCollaborators(projectId);
  const { mutate: makeAdmin, isPending: makingUserAdmin } = useMakeUserAdmin({ projectId });
  const { mutate: removeUser, isPending: removingUser } = useRemoveUserFromProject({ projectId });
  const { deleteTheProject, isdeletingTheProject } = useDeleteProject();
  const { mutate: exitProject, isPending: exitingProject } = useExitProject();

  const { sendMessage } = useSocket(projectId, (data) => {
    if (data.sender === "AI") {
      setAiResponses((prev) => [...prev, data]);
      setIsGenerating(false);
    } else {
      setMessages((prev) => [...prev, data]);
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
      isAI: inputValue.toLowerCase().includes('@ai'),
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, newMessage]);

    if (newMessage.isAI) {
      setIsGenerating(true);
    }

    sendMessage("project-message", newMessage);
    setInputValue("");
  };

  return (
    <main className="h-screen w-full flex flex-col md:flex-row overflow-hidden bg-black">
      {/* Left Section */}
      <section className="w-full md:w-[30%] flex flex-col relative">
        <div className="absolute inset-0 bg-black/95" style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(30, 64, 175, 0.05) 0%, rgba(0, 0, 0, 0.95) 100%)',
        }} />

        <div className="relative flex flex-col h-full border-r border-blue-500/20">
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
        </div>
      </section>

      {/* Right Section */}
      <section className="flex-1 flex flex-col min-w-0 relative">
        <div className="absolute inset-0 bg-blue-800/95" style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(30, 64, 175, 0.05) 0%, rgba(0, 0, 0, 0.95) 100%)',
        }} />

        <div className="relative flex flex-col h-full">
          <header className="p-4 border-b border-blue-500/20 backdrop-blur-sm">
            <div className="flex justify-between items-center">
              <button
                onClick={() => navigate("/")}
                className="group relative"
              >
                <div className="absolute inset-0 bg-blue-800/20 rounded-xl blur-sm transform group-hover:scale-105 transition-transform duration-300" />
                <div className="relative flex items-center gap-2 px-4 py-2 rounded-xl border border-blue-500/20 backdrop-blur-sm bg-blue-900/50 text-white transition-all duration-300 group-hover:border-blue-500/40">
                  <ArrowLeft size={18} />
                  <span>Back</span>
                </div>
              </button>

              <h1 className="text-2xl font-bold text-white">AI Responses</h1>

              <div className="flex gap-3">
                <button
                  onClick={handleExitProject}
                  disabled={exitingProject}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-blue-800/20 rounded-xl blur-sm transform group-hover:scale-105 transition-transform duration-300" />
                  <div className="relative flex items-center gap-2 px-4 py-2 rounded-xl border border-blue-500/20 backdrop-blur-sm bg-blue-900/50 text-white transition-all duration-300 group-hover:border-blue-500/40">
                    <LogOut size={18} />
                    {exitingProject ? (
                      <span className="flex items-center gap-2">
                        Exiting
                        <div className="flex space-x-1">
                          <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                          <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                        </div>
                      </span>
                    ) : (
                      "Exit Project"
                    )}
                  </div>
                </button>

                <button
                  onClick={() => handleDeleteProject(projectId)}
                  disabled={isdeletingTheProject}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-red-900/20 rounded-xl blur-sm transform group-hover:scale-105 transition-transform duration-300" />
                  <div className="relative flex items-center gap-2 px-4 py-2 rounded-xl border border-red-500/20 backdrop-blur-sm bg-red-900/30 text-white transition-all duration-300 group-hover:border-red-500/40">
                    <Trash2 size={18} />
                    {isdeletingTheProject ? (
                      <span className="flex items-center gap-2">
                        Deleting
                        <div className="flex space-x-1">
                          <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                          <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                        </div>
                      </span>
                    ) : (
                      "Delete Project"
                    )}
                  </div>
                </button>
              </div>
            </div>
          </header>

          <AIResponses aiResponses={aiResponses} isGenerating={isGenerating} />
        </div>
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