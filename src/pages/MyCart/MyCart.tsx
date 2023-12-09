// Import necessary moduls and types
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useAppContext } from "../../hooks/useAppContext";
import { Product } from "../../types/types";

// Set up Stripe with your public key
const stripePromise = loadStripe(
  "pk_test_51OLZPZCrZvWjk8lgdizi7GgeoO6htosfuHgZERzoXNaHd9rliEmQ1CuOaeGQ9rfuZ2bBMF5RyKCqm8OInHkT0MGr00BpbX2AR1"
);

// Main functional component for the shopping cart
function MyCart() {
  // Destructure values from the app context
  const {
    cart,
    addToCart,
    removeFromCart,
    products,
    setProducts,
  } = useAppContext();

  // Handle click event for the checkout button
  const handleClick = async (
    event: React.FormEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await stripePromise;
    const result = await stripe!.redirectToCheckout({
      lineItems: [
        {
          price: "price_1OLaIHCrZvWjk8lg0AMeLP3O", // Replace with the ID of your price
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

  // Define type for an item in the cart with frequencies
  type CartWithFrequenciesItem = {
    name: string;
    product: Product;
    count: number;
  };

  // Create an array to store items in the cart with frequencies
  const cartWithFrequencies: CartWithFrequenciesItem[] = [];
  // Iterate through each product in the cart
  cart.forEach((product) => {
    // Find the index of the product in the cartWithFrequencies array
    const foundIndex = cartWithFrequencies.findIndex(
      (v) => v.name === product.name
    );
    // If the product is not found, ad it to the cartWithFrequencies array
    if (foundIndex === -1)
      return cartWithFrequencies.push({
        name: product.name,
        product,
        count: 1,
      });
    // If the product is already in the cartWithFrequencies array, increment its count
    cartWithFrequencies[foundIndex].count += 1;
  });

  // Render the shopping cart component
  return (
    <div className="page">
      <h1 className="text-[3rem] font-medium">My Cart</h1>
      <div className="min-h-[50%] flex flex-col px-20">
        {/* Render each item in the cart with frequencies */}
        {cart.length !== 0 ? (
          cartWithFrequencies.map(({ name, product, count }) => (
            <div key={product.name}>
              <div className="flex items-center">
                {/* Button to remove an item from the cart */}
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
                {/* Display sthe count of the item in the cart */}
                <div className="py-4 px-6 text-xl">{count}</div>
                {/* Button to add an item to the cart */}
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
                {/* Displays the name of the product */}
                <h3 className="font-bold text-2xl">{name}</h3>
              </div>
            </div>
          ))
        ) : (
          // Display a message if the cart is empty
          <div>
            <h1 className="text-xl">Your cart is empty</h1>
            <p>Add items to your cart through the home page</p>
          </div>
        )}
      </div>
      {/* Display the total price if there are items in the cart */}
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
      {/* Display the checkout button if there are items in the cart */}
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

// Export the MyCart component as the default export
export default MyCart;
