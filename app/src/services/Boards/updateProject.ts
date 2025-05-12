import api from "@/api/axios";

const updateProject = async (projectId: string, projectData: Partial<any>) => {
  // Adiciona o projectId ao corpo da requisição
  const data = {
    ...projectData,
    projectId,
  };

  try {
    const response = await api.put("project", data);
    console.log("Update Response:", response);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
};

export default updateProject;
