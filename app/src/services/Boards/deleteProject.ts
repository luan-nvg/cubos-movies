import api from "@/api/axios";

const deleteProject = async (projectId: string) => {
  const url = `project/${projectId}`;

  try {
    const response = await api.delete(url);
    console.log("Project deleted successfully");
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
};

export default deleteProject;
