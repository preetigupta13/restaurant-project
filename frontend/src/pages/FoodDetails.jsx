import { useParams, Link } from "react-router-dom";
import foods from "../data/foods";
import { useCart } from "../context/CartContext";

function FoodDetails() {

  const { id } = useParams();

  const food = foods.find(
    (item) => item.id === Number(id)
  );

  const { addToCart } = useCart();

  if (!food) {
    return (
      <div className="not-found">
        <h2>Food not found 😔</h2>
        <Link to="/menu">
          Back to Menu
        </Link>
      </div>
    );
  }

  return (
    <main className="food-details">

      <div className="details-image">
        <img
          src={food.image}
          alt={food.name}
        />
      </div>

      <div className="details-content">

        <span>{food.category}</span>

        <h1>{food.name}</h1>

        <div className="details-rating">
          ⭐ {food.rating}
        </div>

        <p>{food.description}</p>

        <h2>₹{food.price}</h2>

        <button
          className="add-cart-large"
          onClick={() => addToCart(food)}
        >
          Add To Cart 🛒
        </button>

        <Link
          to="/menu"
          className="back-menu"
        >
          ← Back to Menu
        </Link>

      </div>

    </main>
  );
}

export default FoodDetails;