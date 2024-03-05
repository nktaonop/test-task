export type Inputs = {
  name: string;
  email: string;
  phone: number;
  address: string;
};

export type Shops = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export type SelectedShop = {
  id: string;
  title: string;
  image: string;
  price: number;
  description: string;
  shopTitle: string;
  createdAt: string;
  updatedAt: string;
};

export interface SelectedProduct {
  createdAt: string;
  description: string;
  id: string;
  image: string;
  price: number;
  quantity: number;
  shopTitle: string;
  title: string;
  updatedAt: string;
}
