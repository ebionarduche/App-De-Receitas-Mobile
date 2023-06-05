import React, { useState } from 'react';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const regex = /^[^\s@]{2,}@[^\s@]+\.[^\s@]+$/;
  const { email, password } = values;
  const testEmail = regex.test(email);
  const minCaracteres = 7;

  const habilited = password.length >= minCaracteres && testEmail === true;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <form>
      <input
        data-testid="email-input"
        type="email"
        name="email"
        value={ values.email }
        onChange={ handleInputChange }
      />

      <input
        data-testid="password-input"
        type="password"
        name="password"
        value={ values.password }
        onChange={ handleInputChange }
      />

      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ !habilited }
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
