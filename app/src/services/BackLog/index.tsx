import api from "../../api/axios";

import axios, { AxiosError } from "axios";

const handleAxiosError = (error: AxiosError) => {
  console.error("Error response:", error.response?.data);
};

const backLogService = {
  getAllLists: async (projectId: string) => {
    const url = `/project/lists`;

    try {
      const response = await api.get(url, {
        params: {
          projectId,
        },
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleAxiosError(error);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  },
};

export default backLogService;
