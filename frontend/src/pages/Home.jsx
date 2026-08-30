import { Link } from "react-router-dom";
import foods from "../data/foods";
import FoodCard from "../components/FoodCard";
import "../styles/home.css";

function Home() {

  const popularFoods = foods.slice(0, 3);

  const categories = [
    { name: "Pizza", icon: "🍕" },
    { name: "Burger", icon: "🍔" },
    { name: "Pasta", icon: "🍝" },
    { name: "Indian", icon: "🍛" },
    { name: "Dessert", icon: "🍰" }
  ];

  return (
    <>

      {/* HERO */}

      <section className="hero">

        <div className="hero-content">

          <span className="hero-tag">
            🍽️ Welcome to Foodie
          </span>

          <h1>
            Good Food.
            <br />
            <span>Good Mood.</span>
          </h1>

          <p>
            Discover delicious meals prepared with fresh
            ingredients and delivered right to your doorstep.
          </p>

          <Link to="/menu" className="hero-button">
            Explore Menu →
          </Link>

        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=80"
            alt="Delicious food"
          />
        </div>

      </section>


      {/* CATEGORIES */}

      <section className="categories section">

        <div className="section-heading">
          <span>EXPLORE</span>
          <h2>What are you craving?</h2>
        </div>

        <div className="category-grid">

          {categories.map((category) => (
            <Link
              to={`/menu?category=${category.name}`}
              className="category-card"
              key={category.name}
            >
              <div className="category-icon">
                {category.icon}
              </div>

              <h3>{category.name}</h3>

              <span>Explore →</span>
            </Link>
          ))}

        </div>

      </section>


      {/* POPULAR FOOD */}

      <section className="popular section">

        <div className="section-heading">

          <span>OUR MENU</span>

          <h2>Popular Dishes</h2>

          <p>
            Our most loved dishes, prepared fresh every day.
          </p>

        </div>

        <div className="food-grid">

          {popularFoods.map((food) => (
            <FoodCard
              key={food.id}
              food={food}
            />
          ))}

        </div>

        <div className="center-button">

          <Link
            to="/menu"
            className="outline-button"
          >
            View Full Menu →
          </Link>

        </div>

      </section>


      {/* WHY US */}

      <section className="why-us section">

        <div className="section-heading">

          <span>WHY FOODIE?</span>

          <h2>Made for food lovers</h2>

        </div>

        <div className="features">

          <div className="feature">
            <div>🚀</div>
            <h3>Fast Delivery</h3>
            <p>
              Hot and fresh food delivered quickly.
            </p>
          </div>

          <div className="feature">
            <div>🥗</div>
            <h3>Fresh Ingredients</h3>
            <p>
              We use fresh and quality ingredients.
            </p>
          </div>

          <div className="feature">
            <div>👨‍🍳</div>
            <h3>Expert Chefs</h3>
            <p>
              Delicious meals prepared by experienced chefs.
            </p>
          </div>

          <div className="feature">
            <div>❤️</div>
            <h3>Made With Love</h3>
            <p>
              Every dish is prepared with care.
            </p>
          </div>

        </div>

      </section>


      {/* CTA */}

      <section className="cta">

        <div>

          <span>HUNGRY?</span>

          <h2>
            Your next favorite meal
            is just one click away.
          </h2>

          <Link to="/menu">
            Order Now →
          </Link>

        </div>

      </section>

    </>
  );
}

export default Home;