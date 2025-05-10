import api from "../../../api/axios";
import { IEditProfile } from "../interfaces/IEditPofile";

const endpoint = "/user/update";

export const editUserHook = async (data: IEditProfile) => {
  const request = await api
    .patch(endpoint, { ...data })
    .then((response) => response.data.data)
    .catch((error) => {
      return { error: error.response.data.response };
    });

    return request;
};
