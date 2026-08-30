
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

const handleLogin = async (e) => {
  e.preventDefault();

  setError("");
  setLoading(true);

  try {
    const formData = new URLSearchParams();

    formData.append("username", email.trim());
    formData.append("password", password);

    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    const data = await response.json();

    console.log("Login response:", data);

    if (!response.ok) {
      if (Array.isArray(data.detail)) {
        const message = data.detail
          .map((item) => item.msg)
          .join(", ");

        throw new Error(message);
      }

      throw new Error(data.detail || "Login failed");
    }

    localStorage.setItem("token", data.access_token);
    localStorage.setItem("user", JSON.stringify(data.user));

    alert("Login successful! 🎉");

    navigate("/");
  } catch (error) {
    console.error("Login Error:", error);
    setError(error.message || "Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="auth-page">

      <div className="auth-box">

        <h1>Welcome Back 👋</h1>

        <p>Login to continue ordering.</p>

        <form onSubmit={handleLogin}>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p style={{ color: "red" }}>
              {error}
            </p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p>
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>

      </div>

    </main>
  );
}

export default Login;




