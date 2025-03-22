export const isAuthenticated = () => {
  try {
    const token = localStorage.getItem("token");
    return !!token;
  } catch (error) {
    console.error("Authentication check failed:", error);
    return false;
  }
};