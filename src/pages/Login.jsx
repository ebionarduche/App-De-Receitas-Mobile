import React from 'react';

function Login() {
  return (
    <form>
      <input
        data-testid="email-input"
        type="email"
      />

      <input
        data-testid="password-input"
        type="senha"
      />

      <button
        data-testid="login-submit-btn"
        type="button"
      >
        Entrar

      </button>

    </form>
  );
}

export default Login;
