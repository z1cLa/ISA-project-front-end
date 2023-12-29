import api from "../api/axios";

export const getLoggedUser = async () => {
  const response = await api.get("auth/whoami");
  return response.data;
};
