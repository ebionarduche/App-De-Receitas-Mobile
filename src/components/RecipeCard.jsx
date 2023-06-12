import React from 'react';
import PropTypes from 'prop-types';

export default function RecipeCard({ index, recipe }) {
  const {
    thumbnail,
    category,
    name,
    dateDone,
    strTags,
  } = recipe;

  // As Tags vem da API numa string separadas por vírgula
  const tagsP = strTags.split(',').splice(0, 2).map((tag, ind) => (
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
        src={ thumbnail }
        alt={ name }
        data-testid={ `${index}-horizontal-image` }
      />
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        { category }
      </p>
      <p
        data-testid={ `${index}-horizontal-name` }
      >
        { name }
      </p>
      <p
        data-testid={ `${index}-horizontal-done-date` }
      >
        { dateDone }
      </p>
      { tagsP }
      <button
        data-testid={ `${index}-horizontal-share-btn` }
      >
        Compartilhar
      </button>
    </div>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    thumbnail: PropTypes.string,
    category: PropTypes.string,
    name: PropTypes.string,
    dateDone: PropTypes.string,
    strTags: PropTypes.string,
  }).isRequired,
};
