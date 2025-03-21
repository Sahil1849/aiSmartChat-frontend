import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchProjects } from "../hooks/projects/useFetchProjects";
import { useCreateProject } from "../hooks/projects/useCreateProject";
import { SparklesCore } from "../components/ui/Sparkles";
import { PlusCircle, Users, Loader2, Brain, Search } from "lucide-react";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const { data: projects, isLoading: isFetching, error: fetchError } =
    useFetchProjects();
  const {
    mutate: createProject,
    isLoading: isCreating,
    error: createError,
  } = useCreateProject();

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

  const filteredProjects = projects?.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-[92vh] flex flex-col bg-black overflow-hidden">
      {/* Sparkles Background */}
      <div className="absolute inset-0 w-full h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={80}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-grow w-full px-6 pt-24 pb-12 overflow-y-auto">
        {isFetching && (
          <div className="flex items-center justify-center gap-3 text-blue-400">
            <Loader2 className="animate-spin" size={24} />
            <span className="text-lg">Loading projects...</span>
          </div>
        )}

        {fetchError && (
          <div className="max-w-md mx-auto p-4 bg-red-900/20 border border-red-500/20 rounded-xl backdrop-blur-sm">
            <p className="text-red-400 text-center">{fetchError.message}</p>
          </div>
        )}

        {!isFetching && !fetchError && projects?.length === 0 ? (
          // If No Projects
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-blue-800/30 rounded-full blur-xl transform animate-pulse" />
              <div className="relative p-6 rounded-full bg-gradient-to-br from-blue-900 to-blue-800 border border-blue-500/20">
                <Brain size={60} className="text-blue-400" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              No Projects Found
            </h2>
            <p className="text-gray-400 mb-8 max-w-md">
              Start collaborating on your AI projects! Create your first project
              to begin organizing your team's work and chat with the AI
              assistant.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative"
            >
              <div className="absolute inset-0 bg-blue-800/20 rounded-xl blur-lg transform group-hover:scale-110 transition-transform duration-300" />
              <div className="relative flex items-center gap-2 px-6 py-3 bg-blue-900/50 border border-blue-500/20 backdrop-blur-sm text-white rounded-xl transition-all duration-300 group-hover:border-blue-500/40">
                <PlusCircle size={22} />
                <span className="text-lg">Create Your First Project</span>
              </div>
            </button>
          </div>
        ) : (
          <>
            {/* Show header section only when projects exist */}
            {projects?.length > 0 && (
              <div className="pb-12 px-4 flex justify-between items-center">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group relative"
                  disabled={isCreating}
                >
                  <div className="absolute inset-0 bg-blue-800/20 rounded-xl blur-lg transform group-hover:scale-110 transition-transform duration-300" />
                  <div className="relative flex items-center gap-2 px-4 py-2 bg-blue-900/50 border border-blue-500/20 backdrop-blur-sm text-white rounded-xl transition-all duration-300 group-hover:border-blue-500/40">
                    <PlusCircle size={18} />
                    <span>Create Project</span>
                  </div>
                </button>
                <h1 className="text-2xl text-slate-300 font-bold tracking-wide">
                  My Projects
                </h1>
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-blue-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 pl-10 pr-4 py-2 rounded-xl bg-blue-900/20 border border-blue-500/20 text-white placeholder-blue-400/70 outline-none transition-all duration-300 focus:border-blue-500/40 focus:bg-blue-900/30"
                  />
                </div>
              </div>
            )}

            {/* Project grid */}
            {projects?.length > 0 && (
              <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProjects?.map((project) => (
                  <div
                    key={project._id}
                    onClick={() =>
                      navigate(`/project/${project._id}`, { state: { project } })
                    }
                    className="group relative cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-blue-800/10 rounded-2xl blur-xl transform group-hover:scale-105 transition-transform duration-300" />
                    <div className="relative p-6 rounded-2xl border border-blue-500/20 backdrop-blur-sm bg-zinc-900/70 transition-all duration-300 group-hover:border-blue-500/40">
                      <h2 className="text-xl font-semibold text-white mb-3">
                        {project.name}
                      </h2>
                      <div className="flex items-center text-blue-400">
                        <Users size={16} className="mr-2" />
                        <span className="text-sm">
                          {project.members.length} members
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Create Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div
            className="relative w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background blur effect */}
            <div className="absolute inset-0 bg-blue-800/10 rounded-2xl blur-xl transform" />

            {/* Modal content */}
            <div className="relative rounded-2xl border border-blue-500/20 backdrop-blur-sm bg-zinc-900/70">
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center">
                    <PlusCircle size={24} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    Create New Project
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-blue-400 mb-2">
                      Project Name
                    </label>
                    <input
                      type="text"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl bg-blue-900/20 border border-blue-500/20 text-white placeholder-blue-400/70 outline-none transition-all duration-300 focus:border-blue-500/40 focus:bg-blue-900/30"
                      placeholder="Enter project name"
                      required
                    />
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-blue-500/20">
                    <button
                      type="submit"
                      disabled={isCreating}
                      className="relative group flex-1"
                    >
                      <div className="absolute inset-0 bg-blue-800/20 rounded-xl blur-sm transform group-hover:scale-105 transition-transform duration-300" />
                      <div className="relative py-2.5 px-4 rounded-xl border border-blue-500/20 backdrop-blur-sm bg-blue-900/50 text-white font-medium transition-all duration-300 hover:border-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                        {isCreating ? (
                          <>
                            <span>Creating</span>
                            <div className="flex space-x-1">
                              <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                              <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                              <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                            </div>
                          </>
                        ) : (
                          "Create Project"
                        )}
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="relative group flex-1"
                    >
                      <div className="absolute inset-0 bg-zinc-800/20 rounded-xl blur-sm transform group-hover:scale-105 transition-transform duration-300" />
                      <div className="relative py-2.5 px-4 rounded-xl border border-blue-500/20 backdrop-blur-sm bg-zinc-900/70 text-gray-300 font-medium transition-all duration-300 hover:border-blue-500/40 hover:text-white flex items-center justify-center">
                        Cancel
                      </div>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;