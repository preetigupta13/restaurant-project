import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/navbar.css";

function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <Link to="/" className="logo">
          Food<span>ie</span>
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/login">Login</Link>
          <Link to="/orders">Your Orders</Link>
        </div>

        <Link to="/cart" className="cart-button">
          🛒
          <span>Cart</span>

          {cartCount > 0 && (
            <b className="cart-count">{cartCount}</b>
          )}
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;