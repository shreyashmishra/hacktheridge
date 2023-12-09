import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useAppContext } from "../../hooks/useAppContext";
import { Product } from "../../types/types";

const stripePromise = loadStripe(
  "pk_test_51O1IrbCB3sv2tiD79VtlEDKJwbJzK26uyX9nciH1Fz4KXplBHkNRC92YGsL6xS5EtnhoqZP5SrgiEfzWQwIZN2MG006XWKXG1K"
);

function MyCart() {
  const {
    cart,
    addToCart,
    removeFromCart,
    products,
    setProducts,
  } = useAppContext();

  const handleClick = async (
    event: React.FormEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await stripePromise;
    const result = await stripe!.redirectToCheckout({
      lineItems: [
        {
          price: "price_1O1KidCB3sv2tiD75oiuGEk1", // Replace with the ID of your price
          quantity: 1,
        },
      ],
      mode: "payment",
      successUrl: "http://localhost:5173/success",
      cancelUrl: "http://localhost:5173/cancel",
    });

    // Use the 'error' variable if needed
    const { error } = result;
    if (error) {
      console.error("Stripe Checkout error:", error);
      // Handle the error appropriately
    }
  };

  type cartWithFrequenciesItem = {
    name: string;
    product: Product;
    count: number;
  };

  const cartWithFrequencies: cartWithFrequenciesItem[] = [];
  cart.forEach((product) => {
    const foundIndex = cartWithFrequencies.findIndex(
      (v) => v.name === product.name
    );
    if (foundIndex === -1)
      return cartWithFrequencies.push({
        name: product.name,
        product,
        count: 1,
      });
    cartWithFrequencies[foundIndex].count += 1;
  });

  return (
    <div className="page">
      <h1 className="text-[3rem] font-medium">My Cart</h1>
      <div className="min-h-[50%] flex flex-col px-20">
        {cart.length !== 0 ? (
          cartWithFrequencies.map(({ name, product, count }) => (
            <div key={product.name}>
              <div className="flex items-center">
                <div
                  onClick={() => {
                    removeFromCart(product, 1);
                    const productsCopy = [...products];
                    productsCopy[productsCopy.indexOf(product)].left += 1;
                    setProducts(productsCopy);
                  }}
                  className="cursor-pointer p-4"
                >
                  -
                </div>
                <div className="py-4 px-6 text-xl">{count}</div>
                <div
                  onClick={() => {
                    if (product.left > 0) {
                      addToCart(product);
                      const productsCopy = [...products];
                      productsCopy[productsCopy.indexOf(product)].left -= 1;
                      setProducts(productsCopy);
                    }
                  }}
                  className="cursor-pointer p-4"
                >
                  +
                </div>
                <h3 className="font-bold text-2xl">{name}</h3>
              </div>
            </div>
          ))
        ) : (
          <div>
            <h1 className="text-xl">Your cart is empty</h1>
            <p>Add items to your cart through the home page</p>
          </div>
        )}
      </div>
      {cart.length !== 0 ? (
        <div className="border-gray-300 border-[1px] py-4 px-8 rounded-md w-48 m-auto mb-4">
          <h2 className="font-bold text-xl">Total Price</h2>
          <p className="font-mono text-lg">
            ${" "}
            {cart
              .map((p) => +p.cost.slice(1))
              .reduce((acc, curr) => acc + curr)
              .toFixed(2)}
          </p>
        </div>
      ) : (
        <></>
      )}
      {cart.length ? (
        <button
          className="bg-green-700 px-4 py-2 rounded-full text-gray-100 hover:bg-green-600 hover:shadow transition"
          onClick={handleClick}
        >
          Proceed to Checkout
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default MyCart;
