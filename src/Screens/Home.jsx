import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchProjects } from "../hooks/projects/useFetchProjects";
import { useCreateProject } from "../hooks/projects/useCreateProject";
import { useLogout } from "../hooks/auth/useLogout";
import {
  PlusCircle,
  LogOut,
  Users,
  Loader2,
  Brain,
  Search,
} from "lucide-react";
import { useCurrentUser } from "../hooks/users/useCurrentUser";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const {
    data: projects,
    isLoading: isFetching,
    error: fetchError,
  } = useFetchProjects();
  const { data: userData } = useCurrentUser(userId);
  const userEmail = userData?.email;
  const {
    mutate: createProject,
    isLoading: isCreating,
    error: createError,
  } = useCreateProject();
  const { mutate: logoutUser, isLoading: isLoggingOut } = useLogout();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProject(projectName);
      setIsModalOpen(false);
      setProjectName("");
    } catch (err) {
      console.error("Error creating project:", err);
    }
  };

  const handleLogout = () => logoutUser();

  const filteredProjects = projects?.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&q=80&w=2832&ixlib=rb-4.0.3")',
      }}
    >
      <div className="min-h-screen bg-black bg-opacity-50">
        <nav className="fixed w-full bg-white bg-opacity-90 shadow-lg backdrop-blur-sm z-50">
          <div className="max-w-full mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-lg font-bold text-purple-800">
              Welcome, {userEmail}
            </h1>

            <h1 className="text-2xl text-purple-800 text-center flex justify-center items-center gap-1 font-bold">
              AI-SmartChat {<Brain />}
            </h1>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-purple-300 hover:bg-purple-300 text-purple-800 rounded-lg transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
              disabled={isLoggingOut}
            >
              <LogOut size={18} />
              {isLoggingOut ? (
                <span className="flex items-center text-white gap-2">
                  Logging out...
                  <Loader2 className="animate-spin text-white h-5 w-5" />
                </span>
              ) : (
                "Logout"
              )}
            </button>

          </div>
        </nav>

        <div className="max-w-full mx-auto px-6 pt-24 pb-12">
          {isFetching && (
            <div className="text-center text-white">
              <Loader2 className="animate-spin inline-block mr-2" />
              Loading projects...
            </div>
          )}

          {fetchError && (
            <p className="text-red-400 text-center mb-6">
              {fetchError.message}
            </p>
          )}

          {!isFetching && !fetchError && projects?.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
              <div className="mb-8 p-6 bg-purple-100 rounded-full">
                <Brain size={60} className="text-purple-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-200 mb-4">
                No Projects Found
              </h2>
              <p className="text-gray-300 mb-8 max-w-md">
                Start collaborating on your AI projects! Create your first
                project to begin organizing your team's work and chat with the
                AI assistant.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl 
                         transform transition-all duration-200 hover:scale-105 hover:shadow-lg text-lg"
              >
                <PlusCircle size={22} />
                Create Your First Project
              </button>
            </div>
          ) : (
            <>
              {/* Show header section only when projects exist */}
              {projects?.length > 0 && (
                <div className="pb-12 flex justify-between">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
                    disabled={isCreating}
                  >
                    <PlusCircle size={18} />
                    <span>Create Project</span>
                  </button>
                  <h1 className="text-3xl text-gray-200 tracking-wide font-bold">
                    My Projects
                  </h1>
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-3 text-purple-500"
                      size={20}
                    />
                    <input
                      type="text"
                      placeholder="Search projects..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border-2 border-purple-500 rounded-xl bg-transparent text-gray-200 outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Project grid */}
              {projects?.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredProjects?.map((project) => (
                    <div
                      key={project._id}
                      onClick={() =>
                        navigate(`/project/${project._id}`, {
                          state: { project },
                        })
                      }
                      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-purple-100"
                    >
                      <h2 className="text-xl font-semibold text-purple-900 mb-3">
                        {project.name}
                      </h2>
                      <div className="flex items-center text-purple-600">
                        <Users size={16} className="mr-2" />
                        <span className="text-sm">
                          {project.members.length} members
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center animate-fadeIn backdrop-blur-sm z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="bg-white rounded-2xl p-8 w-full max-w-md transform animate-slideUp mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-purple-900 mb-6">
                Create New Project
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-purple-900 mb-2">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter project name"
                    required
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-purple-600 hover:text-purple-800 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isCreating}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-200"
                  >
                    {isCreating ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      "Create Project"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
