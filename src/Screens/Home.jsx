// components/Home.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchProjects } from "../hooks/projects/useFetchProjects";
import { useCreateProject } from "../hooks/projects/useCreateProject";
import { useLogout } from "../hooks/auth/useLogout";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const navigate = useNavigate();

  // Use the fetch projects hook
  const {
    data: projects,
    isLoading: isFetching,
    error: fetchError,
  } = useFetchProjects();

  // Use the create project hook
  const {
    mutate: createProject,
    isLoading: isCreating,
    error: createError,
  } = useCreateProject();

  const {
    mutate: logoutUser,
    isLoading: isLoggingOut,
    error: logoutError,
  } = useLogout();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Creating project:", projectName);
      await createProject(projectName);
      setIsModalOpen(false);
      setProjectName("");
    } catch (err) {
      console.error("Error creating project:", err);
    }
  };

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <main>
      <div className="flex flex-col justify-center items-center h-screen">
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-4 border-2 rounded-md mb-4"
        >
          Create Project
        </button>

        <button
          className="p-2 bg-red-500 text-white rounded-md mb-4"
          onClick={handleLogout}
        >
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>

        {isFetching && <p>Loading projects...</p>}
        {fetchError && <p className="text-red-500">{fetchError.message}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects?.map((project) => (
            <div
              key={project._id}
              onClick={() => navigate("/project", { state: { project } })}
              className="p-4 border-2 cursor-pointer rounded-md"
            >
              <h2 className="text-lg font-semibold">{project.name}</h2>
              <div>
                <small>Users: {project.user.length}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-xl mb-4">Create Project</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  onChange={(e) => setProjectName(e.target.value)}
                  value={projectName}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter project name"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-2 p-2 bg-gray-200 rounded-md"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isCreating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="p-2 bg-blue-500 text-white rounded-md"
                  disabled={isCreating}
                >
                  {isCreating ? "Creating..." : "Create"}
                </button>
              </div>
            </form>
            {createError && (
              <p className="text-red-500 mt-2">{createError.message}</p>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
