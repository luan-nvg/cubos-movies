import api from "../../../api/axios";
import { IChangePassword } from "../interfaces/IChangePassword";

const endpoint = "/auth/changepass";

export const changePasswordHook = async (data: IChangePassword) => {
  const request = await api
    .patch(endpoint, { ...data })
    .then((response) => response.data)
    .catch((error) => {
      return { error: error.response.data.response };
    });

    return request;
  
};
