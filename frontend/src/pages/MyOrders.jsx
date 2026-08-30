import { useEffect, useState } from "react";
import "../styles/orders.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please login first.");
          setLoading(false);
          return;
        }

        const response = await fetch(
  `${import.meta.env.VITE_API_URL}/orders/`,
  {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
);

        const data = await response.json();

        console.log("Orders response:", data);

        if (!response.ok) {
          throw new Error(
            data.detail || "Failed to fetch orders"
          );
        }

        setOrders(data);
      } catch (error) {
        console.error("Orders Error:", error);
        setError(
          error.message || "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <main className="orders-page">
        <h1>My Orders</h1>
        <p>Loading orders...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="orders-page">
        <h1>My Orders</h1>
        <p style={{ color: "red" }}>{error}</p>
      </main>
    );
  }

  return (
    <main className="orders-page">

      <div className="orders-title">
        <span>YOUR ORDERS</span>
        <h1>My Orders</h1>
      </div>

      {orders.length === 0 ? (
        <div className="no-orders">
          <h2>No orders yet</h2>
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="orders-list">

          {orders.map((order) => (
            <div
              className="order-card"
              key={order.id}
            >

              <div>
                <span>Order ID</span>
                <h3>#{order.id}</h3>
              </div>

              <div>
                <span>Total</span>
                <strong>
                  ₹{order.total_amount}
                </strong>
              </div>

              <div>
                <span>Status</span>
                <strong>
                  {order.status}
                </strong>
              </div>

            </div>
          ))}

        </div>
      )}

    </main>
  );
}

export default MyOrders;
