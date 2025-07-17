export type AdminDashboardWidgetsResponse = {
  productsCount: number;
  usersCount: number;
  ordersCount: number;
  totalSales: string;
  currentMonthSales: string;
  todaySales: string;
};

export type SalesByPersianMonthOfYearResponse = {
  persianMonthName: string;
  sales: number;
};

export type TopFiveCitiesBySalesOfYearResponse = {
  city: string;
  sales: number;
};

export type TopFiveProvincesBySalesOfYearResponse = {
  province: string;
  sales: number;
};

export type UserDashboardWidgetsResponse = {
  totalOrders: number;
  totalPurchase: string;
  currentMonthPurchase: string;
  pendingOrders: number;
  processingOrders: number;
  shippedOrders: number;
};
