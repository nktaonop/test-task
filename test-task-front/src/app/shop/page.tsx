'use client';
import './shop.scss';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  ProductsStructure,
  useProductContext,
} from '../context/ProductContext';
import { Shops, SelectedShop } from '@/app/interfaces/interfaces';

export default function Shop() {
  const [shops, setShops] = useState([]);
  const [selectedShopId, setSelectedShopId] = useState(null);
  const [selectedShopTitle, setSelectedShopTitle] = useState('');
  const [products, setProducts] = useState([]);
  const { selectProduct, selectedProduct } = useProductContext();

  const getShops = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/shops');
      if (!response.ok) {
        throw new Error('Не удалось получить данные');
      }
      const jsonData = await response.json();
      setShops(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getShops();
  }, []);

  const getProducts = async (shopId: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/products?shopId=${shopId}`
      );
      if (!response.ok) {
        throw new Error('Error data');
      }
      const jsonData = await response.json();
      setProducts(jsonData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShopSelect = (selectedShopId: any, selectedShopTitle: string) => {
    setSelectedShopId(selectedShopId);
    setSelectedShopTitle(selectedShopTitle);
    void getProducts(selectedShopId);
  };

  const handleAddToCart = (product: SelectedShop) => {
    selectedProduct.product = product;
    selectProduct(ProductsStructure.from(selectedProduct.products));
  };

  return (
    <div className="container">
      <div className="shops">
        <h1 className="title">Shops:</h1>
        {shops.map((shop: Shops) => (
          <button
            className="chose-shop"
            key={shop.id}
            onClick={() => handleShopSelect(shop.id, shop.title)}>
            {shop.title}
          </button>
        ))}
      </div>
      {!selectedShopTitle ? (
        <span className="choose">Choose a store</span>
      ) : (
        <div className="product">
          <h1>{selectedShopTitle}</h1>
          <ul className="selected-shop">
            {products.map((product: SelectedShop) => (
              <li className="selected-product" key={product.id}>
                <Image
                  className="product-image"
                  src={product.image}
                  width={140}
                  height={130}
                  alt="Picture of the product"
                />
                <h5>{product.title}</h5>
                <div className="product-container">
                  <span className="price">
                    Price: <strong>{product.price}₴</strong>
                  </span>
                  <button
                    className="add-to-cart"
                    onClick={() => handleAddToCart(product)}>
                    Add to cart
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
