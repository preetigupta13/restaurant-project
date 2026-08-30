import { Link } from "react-router-dom";

function Register() {
  return (
    <main className="auth-page">

      <div className="auth-box">

        <h1>Create Account 🍽️</h1>

        <p>Join Foodie and start ordering.</p>

        <form>

          <label>Full Name</label>

          <input
            type="text"
            placeholder="Enter your name"
          />

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Create password"
          />

          <button type="submit">
            Create Account
          </button>

        </form>

        <p>
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </div>

    </main>
  );
}

export default Register;