import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const submit = e => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <form data-test-id="login-form" onSubmit={submit}>
      <input
        data-test-id="email-input"
        type="email"
        placeholder="Email"
        defaultValue="test@example.com"
      />
      <input
        data-test-id="password-input"
        type="password"
        placeholder="Password"
      />
      <button data-test-id="login-button">Login</button>
    </form>
  );
}
