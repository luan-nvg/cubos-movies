import api from "../../../api/axios";
import { ICreateProject } from "../interfaces/ICreateProject";

const endpoint = "/project";

export const createProjectHook = async (data: ICreateProject) => {
  const request = await api
    .post(endpoint, { ...data })
    .then((response) => response.data.data)
    .catch((error) => {
      return { error: error.response.data.response };
    });

  return request;
};
