export const isAuthenticated = () => {
  try {
    const token = localStorage.getItem("token");
    return !!token; // Return true if token exists, false otherwise
  } catch (error) {
    console.error("Authentication check failed:", error);
    return false;
  }
};