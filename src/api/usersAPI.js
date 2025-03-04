import axios from "../config/axios.config";

// Fetch all users
export const fetchAllUsers = async () => {
    const response = await axios.get("/user/all");
    return response.data?.users;
};

// Add collaborators to a project
export const addCollaboratorsToProject = async (projectId, userIds) => {
    const response = await axios.put("/project/add-user", {
        projectId,
        users: userIds,
    });
    return response.data;
};