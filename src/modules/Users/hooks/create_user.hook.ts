import api from "../../../api/axios";
import { ICreateUser } from "../interfaces/ICreateUser";

const endpoint = "/auth/register";

export const createUserHook = async (data: ICreateUser) => {
  const request = await api
    .post(endpoint, { ...data })
    .then((response) => response.data.data)
    .catch((error) => {
      return { error: error.response.data.response };
    });

    return request;
};
