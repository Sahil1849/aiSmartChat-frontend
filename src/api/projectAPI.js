import axios from "../config/axios.config";

// Fetch all projects
export const fetchProjects = async () => {
  const response = await axios.get("/project/all");
  return response.data.projects;
};

// Fetch project details by ID
export const fetchProjectById = async (projectId) => {
  const response = await axios.get(`/project/${projectId}`);
  return response.data?.project;
};

// Create a new project
export const createProject = async (projectName) => {
  const response = await axios.post("/project/create", { name: projectName });
  return response.data;
};

// Remove a user from a project
export const removeUserFromProject = async ({ projectId, userIdToRemove }) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(
    "/project/remove-user",
    { projectId, userId: userIdToRemove },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Transfer project ownership
export const transferProjectOwnership = async (projectId, newOwnerId) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(
    "/project/transfer-ownership",
    { projectId, newOwnerId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Add collaborators to a project
export const addCollaborators = async (projectId, users) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(
    "/project/add-user",
    { projectId, users },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const exitProject = async (projectId) => {
  const response = await axios.delete(`/project/exit/${projectId}`);
  return response.data;
};

export const deleteProject = async (projectId) => {

  const response = await axios.delete(`/project/delete/${projectId}`);
  return response.data;
};