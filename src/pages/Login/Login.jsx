import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      !storedUser ||
      storedUser.email !== email ||
      storedUser.password !== password
    ) {
      setError("Invalid email or password");
      return;
    }

    localStorage.setItem("auth", true); // Mark user as logged in
    navigate("/"); // Redirect to homepage or dashboard
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <p onClick={() => navigate("/signup")} className="switch-link">
          Don’t have an account? Sign up
        </p>
      </form>
    </div>
  );
};

export default Login;
