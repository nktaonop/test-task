export class CreateOrderDto {
  name: string;
  address: string;
  phone: string;
  email: string;

  orderItems: OrderItemDto[];
}

export class OrderItemDto {
  productId: string;
  quantity: number;
}
