import React from 'react';
import PropTypes from 'prop-types';

export default function RecipeCard({ index, recipe }) {
  const {
    type,
    image,
    category,
    nationality,
    alcoholicOrNot,
    name,
    doneDate,
    tags,
  } = recipe;

  // As Tags vem da API numa string separadas por vírgula
  const tagsP = tags.split(',').splice(0, 2).map((tag, ind) => (
    <p
      key={ tag + index + ind }
      data-testid={ `${index}-${tag}-horizontal-tag` }
    >
      { tag }
    </p>
  ));

  return (
    <div>
      <img
        src={ image }
        alt={ name }
        data-testid={ `${index}-horizontal-image` }
      />
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        { type === 'drink' ? alcoholicOrNot : `${nationality} - ${category}` }
      </p>
      <p
        data-testid={ `${index}-horizontal-name` }
      >
        { name }
      </p>
      <p
        data-testid={ `${index}-horizontal-done-date` }
      >
        { doneDate }
      </p>
      { tagsP }
      <img
        data-testid={ `${index}-horizontal-share-btn` }
        src="src/images/shareIcon.svg"
        alt="share"
      />
    </div>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    type: PropTypes.string,
    image: PropTypes.string,
    category: PropTypes.string,
    nationality: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    name: PropTypes.string,
    doneDate: PropTypes.string,
    tags: PropTypes.string,
  }).isRequired,
};
