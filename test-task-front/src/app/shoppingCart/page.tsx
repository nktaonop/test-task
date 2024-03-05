'use client';
import './shoppingCart.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  ProductsStructure,
  useProductContext,
} from '@/app/context/ProductContext';
import { Inputs, SelectedProduct } from '@/app/interfaces/interfaces';

export default function ShoppingCard() {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const { selectedProduct, selectProduct, clearCart } = useProductContext();

  console.log(selectedProduct);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const orderData = {
        name: data.name,
        address: data.address,
        phone: data.phone,
        email: data.email,
        orderItems: selectedProduct.products.map(
          (product: SelectedProduct) => ({
            productId: product.id,
            quantity: product.quantity,
          })
        ),
      };

      const response = await fetch(`http://localhost:8080/api/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit the form');
      }

      console.log('Order submitted successfully:', response);

      clearCart();

      reset();
    } catch (error) {
      console.error('Error submitting the form:', error.message);
    }
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    selectedProduct.products.forEach((product: SelectedProduct) => {
      totalPrice += product.price * product.quantity;
    });
    return totalPrice;
  };

  const handleIncreaseQuantity = (product: SelectedProduct) => {
    selectedProduct.product = product;
    selectProduct(ProductsStructure.from(selectedProduct.products));
  };

  const handleDecreaseQuantity = (product: SelectedProduct) => {
    selectedProduct.decreaseProduct(product);
    selectProduct(ProductsStructure.from(selectedProduct.products));
  };

  const handleRemoveProduct = (product: SelectedProduct) => {
    selectedProduct.removeProduct(product);
    selectProduct(ProductsStructure.from(selectedProduct.products));
  };

  return (
    <div className="container-form">
      <div className="container-modifier">
        <form className="form" onSubmit={handleSubmit(onSubmit)} id="cart-form">
          <input
            className="inputs"
            placeholder="Name"
            {...register('name', { required: true })}
          />
          <input
            className="inputs"
            placeholder="Email"
            {...register('email', { required: true })}
          />
          <input
            className="inputs"
            placeholder="Phone"
            {...register('phone', { required: true })}
          />
          <input
            className="inputs"
            placeholder="Address"
            {...register('address', { required: true })}
          />
        </form>

        <div className="cart">
          <h3>Selected products:</h3>
          <div className="product-info">
            {selectedProduct.products.map((product: SelectedProduct) => (
              <div className="product-container" key={product.id}>
                <div className="product-cart">
                  <h4 className="product-title">{product.title}</h4>
                  <span>{product.price}₴</span>
                </div>
                <div className="product-quantity">
                  <span>Quantity</span>
                  <div className="quantity-button__container">
                    <button
                      className="quantity-buttons"
                      onClick={() => handleIncreaseQuantity(product)}>
                      +
                    </button>
                    <span className="quantity">{product.quantity}</span>
                    <button
                      className="quantity-buttons"
                      onClick={() => handleDecreaseQuantity(product)}>
                      -
                    </button>
                  </div>
                </div>
                <div className="total-prise">
                  <span>{product.price * product.quantity}₴</span>
                  <button
                    className="remove-product"
                    onClick={() => handleRemoveProduct(product)}>
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          {selectedProduct.products.length > 0 && (
            <div className="submit-container">
              <strong className="total-price">
                Total price: {getTotalPrice()}₴
              </strong>
              <button className="send-data" type="submit" form="cart-form">
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
