'use client';
import { createContext, useContext, useState } from 'react';

export class ProductsStructure {
  #products = [];

  constructor(products = []) {
    this.#products = products;
  }

  static from(products) {
    return new ProductsStructure(products);
  }

  set product(value) {
    const productIndex = this.#products.findIndex((el) => el.id === value.id);

    if (productIndex === -1) {
      this.#products.push({ ...value, quantity: 1 });
      return;
    }

    const foundProduct = this.#products[productIndex];

    this.#products[productIndex] = {
      ...foundProduct,
      quantity: ++foundProduct.quantity,
    };
  }

  decreaseProduct(value) {
    const productIndex = this.#products.findIndex((el) => el.id === value.id);

    if (productIndex === -1) return;

    if (this.#products[productIndex].quantity <= 1) {
      this.#products.splice(productIndex, 1);
      return;
    }

    this.#products[productIndex] = {
      ...value,
      quantity: --this.#products[productIndex].quantity,
    };
  }

  removeProduct(value) {
    const productIndex = this.#products.findIndex((el) => el.id === value.id);

    if (productIndex === -1) return;

    this.#products.splice(productIndex, 1);
  }

  get products() {
    return this.#products;
  }
}

const ProductContext = createContext();

export function useProductContext() {
  return useContext(ProductContext);
}

export const ProductProvider = ({ children }) => {
  const [selectedProduct, selectProduct] = useState(new ProductsStructure());

  const clearCart = () => {
    selectProduct(new ProductsStructure());
  };

  return (
    <ProductContext.Provider
      value={{ selectedProduct, selectProduct, clearCart }}>
      {children}
    </ProductContext.Provider>
  );
};
