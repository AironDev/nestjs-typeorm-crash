export type CreateOrderReq = {
  products: Array<number>;
  userId: number;
};

export type UpdateOrderReq = {
  isPaid: boolean;
};
