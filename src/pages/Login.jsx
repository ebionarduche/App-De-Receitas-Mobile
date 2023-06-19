import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import logoRecipes from '../images/logoRecipes.svg';
import '../style/Login.css';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const history = useHistory();

  const regex = /^[^\s@]{2,}@[^\s@]+\.[^\s@]+$/;
  const { email, password } = values;
  const testEmail = regex.test(email);
  const minCaracteres = 7;

  const habilited = password.length >= minCaracteres && testEmail === true;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  return (
    <div className="login-container">
      <div className="background-image-login" />
      <form className="form-login">
        <img src={ logoRecipes } alt="" />
        <h2>Login</h2>
        <input
          placeholder="Type your email here"
          data-testid="email-input"
          type="email"
          name="email"
          value={ values.email }
          onChange={ handleInputChange }
        />
        <input
          placeholder="Type your password here"
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
          onClick={ handleSubmit }
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default Login;
