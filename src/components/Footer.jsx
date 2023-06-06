import { useHistory } from 'react-router-dom';

import React from 'react';
import drink from '../images/drinkIcon.svg';
import food from '../images/mealIcon.svg';
import '../style/Footer.css';
import RecipeDetails from '../pages/RecipeDetails';

function Footer() {
  const history = useHistory();
  const handleClick = (url) => {
    history.push(url);
  };

  return (
    <div>
      <footer
        data-testid="footer"
      >
        <button
          data-testid="drinks-bottom-btn"
          src={ drink }
          onClick={ () => handleClick('/drinks') }
        >
          <img src={ drink } alt="" />
        </button>
        <button
          data-testid="meals-bottom-btn"
          src={ food }
          onClick={ () => handleClick('/meals') }
        >
          <img src={ food } alt="" />
        </button>
      </footer>
      <RecipeDetails />
    </div>
  );
}

export default Footer;
