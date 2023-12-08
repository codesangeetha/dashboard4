
import React, { useState } from "react";

export default function Test() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement login logic here
    console.log('Login attempted with email:', email, 'and password:', password);
  };

  return (
    <div className="login-form">
      <h2 style={{ color: '#fff' }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email or Phone:</label>
        <input
          type="text"
          id="email"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p style={{ color: '#fff' }}>
        Not a member? <a href="/signup">Signup now</a>
      </p>
    </div>
  );
}

const styles = {
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#b3109c',
    padding: '20px',
  },
};

