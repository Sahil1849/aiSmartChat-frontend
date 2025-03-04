import axios from "../config/axios.config";

export const fetchProjects = async () => {
  const response = await axios.get("/project/all");
  return response.data.projects;
};

// Fetch project details
export const fetchProjectById = async (projectId) => {
    const response = await axios.get(`/project/${projectId}`);
    return response.data?.project;
  };

export const createProject = async (projectName) => {
  const response = await axios.post("/project/create", { name: projectName });
  return response.data;
};