import api from "../../../api/axios";

const endpoint = "/user";

export const getUserHook = async () => {
  const request = await api
    .get(endpoint)
    .then((response) => response.data)
    .catch((error) => {
      return { error: error.response.data.response };
    });

  return request;
};

export const deleteUserHook = async () => {
  const request = await api
    .delete(`${endpoint}/delete`)
    .then((response) => response.data)
    .catch((error) => {
      return { error: error.response.data.response };
    });

  return request;
};
