import { axiosInstance } from "../lib/axios";

export const fetchSettingsApi = async () => {
  const response = await axiosInstance.get("/settings");
  return response.data;
};
