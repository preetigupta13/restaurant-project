import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/food-card.css";

function FoodCard({ food }) {
  const { addToCart } = useCart();

  return (
    <div className="food-card">

      <div className="food-image-container">
        <img src={food.image} alt={food.name} />

        <span className="food-rating">
          ⭐ {food.rating}
        </span>
      </div>

      <div className="food-content">

        <span className="food-category">
          {food.category}
        </span>

        <h3>{food.name}</h3>

        <p>{food.description}</p>

        <div className="food-bottom">

          <strong>₹{food.price}</strong>

          <button onClick={() => addToCart(food)}>
            + Add
          </button>

        </div>

        <Link
          to={`/food/${food.id}`}
          className="details-link"
        >
          View Details →
        </Link>

      </div>

    </div>
  );
}

export default FoodCard;