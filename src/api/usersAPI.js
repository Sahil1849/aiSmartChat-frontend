import axios from "../config/axios.config";

// Fetch all users
export const fetchAllUsers = async () => {
  const response = await axios.get("/user/all");
  return response.data?.users;
};

export const getCurrentUser = async (userId) => {
  const response = await axios.get(`/user/currentUser/${userId}`);
  return response.data.data; // Access nested data property
};

export const addCollaboratorsToProject = async (projectId, userIds) => {
  const cleanProjectId = projectId?.id || projectId; // Ensure it's a string

  const response = await axios.put("/project/add-user", {
    projectId: cleanProjectId,
    users: userIds,
  });
  return response.data;
};

export const makeUserAdmin = async ({ projectId, userId }) => {
  const response = await axios.put(`/project/transfer-ownership`, {
    projectId,
    newOwnerId: userId,
  });
  return response.data;
};