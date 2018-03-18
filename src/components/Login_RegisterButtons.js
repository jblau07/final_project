import React from "react";

export const ButtonComponent = () => {
  return (
    <div className="login-container">
      <a href='http://localhost:3000/login'>
        <button type="submit">Login</button>
      </a>
      <a href='http://localhost:3000/register'>
        <button type="submit">Register</button>
      </a>
    </div>
  );
}

export default ButtonComponent;