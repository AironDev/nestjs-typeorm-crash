export class CreateOrderDto {
  products: Array<number>;
  amount: number;
  userId: number;
  isPaid: boolean;
}
