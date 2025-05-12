import api from "../../../api/axios";
import { ILogin } from "../interfaces/ILogin";

const endpoint = "/auth/login";

export const loginHook = async (data: ILogin) => {
  const request = await api
    .post(endpoint, { ...data })
    .then((response) => response.data)
    .catch((error) => {
      return { error: error.response.data.response };
    });

  return request;

};
