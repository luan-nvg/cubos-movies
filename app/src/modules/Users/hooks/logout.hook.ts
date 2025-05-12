import api from "../../../api/axios";

const endpoint = "/auth/logout";

export const logoutHook = async () => {
  const request = await api
    .post(endpoint)
    .then((response) => response.data)
    .catch((error) => {
      return { error: error.response.data.response };
    });

  return request;
};
