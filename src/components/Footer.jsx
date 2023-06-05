import React from 'react';
import drink from '../images/drinkIcon.svg';
import food from '../images/mealIcon.svg';
import '../style/Footer.css';

function Footer() {
  return (
    <footer
      data-testid="footer"
    >
      <button
        data-testid="drinks-bottom-btn"
        src={ drink }
      >
        <img src={ drink } alt="" />
      </button>
      <button
        data-testid="meals-bottom-btn"
        src={ food }
      >
        <img src={ food } alt="" />
      </button>
    </footer>
  );
}

export default Footer;
