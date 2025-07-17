import { axiosInstance } from "../lib/axios";

export const fetchAdminDashboardWidgetsApi = async () => {
  const response = await axiosInstance.get("/reports/admin-dashboard-widgets");
  return response.data;
};

export const fetchSalesByPersianMonthOfYearApi = async () => {
  const response = await axiosInstance.get("/reports/sales-persian-month-of-year");
  return response.data;
};

export const fetchTopFiveCitiesBySalesOfYearApi = async () => {
  const response = await axiosInstance.get("/reports/top-five-cities-sales-year");
  return response.data;
};

export const fetchTopFiveProvincesBySalesOfYearApi = async () => {
  const response = await axiosInstance.get("/reports/top-five-provinces-sales-year");
  return response.data;
};

export const fetchUserDashboardWidgetsApi = async () => {
  const response = await axiosInstance.get("/reports/user-dashboard-widgets");
  return response.data;
};
