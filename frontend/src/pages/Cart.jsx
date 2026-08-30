
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/cart.css";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function Cart() {

  const {
    cart,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
  } = useCart();

  const deliveryFee = cartTotal > 0 ? 40 : 0;
  const grandTotal = cartTotal + deliveryFee;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Place Order
  const handleCheckout = async () => {
  setLoading(true);
  setMessage("");
  setError("");

  try {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login first.");
      return;
    }

    const orderData = {
      total_amount: grandTotal,
      items: cart.map((item) => ({
        food_id: item.id,
        quantity: item.quantity,
        price: item.price
      }))
    };
    

    const response = await fetch(`${API_URL}/orders/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(orderData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Order failed");
    }

    console.log("Order created:", data);

    setMessage(`Order placed successfully! Order ID: ${data.id}`);

  } catch (error) {
    console.error("Order Error:", error);
    setError(error.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};


  if (cart.length === 0) {
    return (
      <main className="empty-cart">

        <div>
          <div className="empty-icon">🛒</div>

          <h1>Your cart is empty</h1>

          <p>
            Looks like you haven't added anything yet.
          </p>

          <Link to="/menu">
            Browse Menu →
          </Link>
        </div>

      </main>
    );
  }


  return (
    <main className="cart-page">

      <div className="cart-title">

        <span>YOUR ORDER</span>

        <h1>Shopping Cart</h1>

      </div>


      <div className="cart-layout">

        <div className="cart-items">

          {cart.map((item) => (

            <div
              className="cart-item"
              key={item.id}
            >

              <img
                src={item.image}
                alt={item.name}
              />

              <div className="cart-item-info">

                <h3>{item.name}</h3>

                <p>₹{item.price}</p>

                <div className="quantity">

                  <button
                    onClick={() =>
                      decreaseQuantity(item.id)
                    }
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      increaseQuantity(item.id)
                    }
                  >
                    +
                  </button>

                </div>

              </div>


              <div className="item-total">

                <strong>
                  ₹{item.price * item.quantity}
                </strong>

                <button
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                >
                  Remove
                </button>

              </div>

            </div>

          ))}

        </div>


        <div className="order-summary">

          <h2>Order Summary</h2>

          <div>
            <span>Subtotal</span>
            <strong>₹{cartTotal}</strong>
          </div>

          <div>
            <span>Delivery</span>
            <strong>₹{deliveryFee}</strong>
          </div>

          <hr />

          <div className="total">
            <span>Total</span>
            <strong>₹{grandTotal}</strong>
          </div>


            <button
           className="checkout-button"
           onClick={handleCheckout}
           disabled={loading}>  
           {loading ? "Placing Order..." : "Proceed to Checkout →"}
         </button>

         {message && (
  <p className="success-message">
    {message}
  </p>
)}

{error && (
  <p className="error-message">
    {error}
  </p>
)}

        </div>

      </div>

    </main>
  );
}

export default Cart;

