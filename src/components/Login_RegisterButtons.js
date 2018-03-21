import React from "react";

export const ButtonComponent = () => {
  return (
    <div className="login-container">
      <a href="/login">
        <button type="submit">Login</button>
      </a>
      <a href="/register">Register</a>
    </div>
  );
};

export default ButtonComponent;
