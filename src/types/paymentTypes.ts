export type CartItem = {
  productId: number;
  quantity: number;
};

export type VerifyPaymentRequest = {
  status: string;
  authority: string;
};

export type VerifyPaymentResponse = {
  orderId: number;
  message: string;
};
