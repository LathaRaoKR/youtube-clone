import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPass) {
      setError("Passwords do not match");
      return;
    }

    // Store user in localStorage for demo
    localStorage.setItem("user", JSON.stringify({ email, password }));
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignup}>
        <h2>Sign Up</h2>
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPass}
          required
          onChange={(e) => setConfirmPass(e.target.value)}
        />
        <button type="submit">Sign Up</button>
        <p onClick={() => navigate("/login")} className="switch-link">
          Already have an account? Login here
        </p>
      </form>
    </div>
  );
};

export default Signup;
