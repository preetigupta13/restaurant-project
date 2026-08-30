import { useState } from "react";
import foods from "../data/foods";
import FoodCard from "../components/FoodCard";
import "../styles/menu.css";

function Menu() {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    "Pizza",
    "Burger",
    "Pasta",
    "Indian",
    "Salad",
    "Dessert"
  ];

  const filteredFoods = foods.filter((food) => {

    const matchesSearch =
      food.name
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      food.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="menu-page">

      <section className="menu-header">

        <span>OUR MENU</span>

        <h1>Choose your favorite food</h1>

        <p>
          Freshly prepared dishes made specially for you.
        </p>

      </section>


      <section className="menu-container">

        <div className="menu-controls">

          <input
            type="text"
            placeholder="Search food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="category-buttons">

            {categories.map((item) => (

              <button
                key={item}
                className={
                  category === item
                    ? "active"
                    : ""
                }
                onClick={() => setCategory(item)}
              >
                {item}
              </button>

            ))}

          </div>

        </div>


        <div className="food-grid">

          {filteredFoods.length > 0 ? (

            filteredFoods.map((food) => (
              <FoodCard
                key={food.id}
                food={food}
              />
            ))

          ) : (

            <div className="no-food">
              <h2>No food found 😔</h2>
              <p>Try another search.</p>
            </div>

          )}

        </div>

      </section>

    </main>
  );
}

export default Menu;