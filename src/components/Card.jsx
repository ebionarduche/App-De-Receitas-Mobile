import React from 'react';
import { PropTypes } from 'prop-types';

function Card({ id, thumbnail, name, index, handleClick }) {
  return (
    <div className="card" key={ id }>
      <button
        className="custom-button"
        data-testid={ `${index}-recipe-card` }
        onClick={ () => handleClick(id) }
      >
        <h6 data-testid={ `${index}-card-name` }>{name}</h6>
        <img
          data-testid={ `${index}-card-img` }
          src={ thumbnail }
          alt={ name }
          width="100px"
        />
      </button>
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.string,
  thumbnail: PropTypes.string,
  name: PropTypes.string,
  index: PropTypes.number,
  handleClick: PropTypes.func,
}.isRequired;

export default Card;
