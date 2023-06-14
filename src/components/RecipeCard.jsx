import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import RecipesContext from '../context/RecipesContext';

import shareIcon from '../images/shareIcon.svg';

export default function RecipeCard({ index, recipe, reload }) {
  const { location } = window;
  const {
    id,
    type,
    image,
    category,
    nationality,
    alcoholicOrNot,
    name,
    doneDate,
    tags,
  } = recipe;

  const { favoriteRecipe, checkFavorited } = useContext(RecipesContext);

  const tagsP = !tags ? [] : tags.map((tag, ind) => (
    <p
      key={ tag + index + ind }
      data-testid={ `${index}-${tag}-horizontal-tag` }
    >
      { tag }
    </p>
  ));

  const urlDetail = `${location.origin}/${type}s/${id}`;
  const [clip, setClip] = useState(false);

  const shareButton = () => {
    navigator.clipboard.writeText(urlDetail);
    setClip(true);
  };

  const favoriteButton = () => {
    favoriteRecipe(recipe);
    reload();
  };

  const history = useHistory();
  const goToDetails = () => {
    history.push(`/${type}s/${id}`);
  };

  return (
    <div>
      <button
        onClick={ goToDetails }
        data-testid={ `${index}-horizontal-image` }
        src={ image }
        alt={ name }
      >
        <img src={ image } alt={ name } width="100px" />
      </button>
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        { type === 'drink' ? alcoholicOrNot : `${nationality} - ${category}` }
      </p>
      <button
        onClick={ goToDetails }
        data-testid={ `${index}-horizontal-name` }
      >
        { name }
      </button>
      <p
        data-testid={ `${index}-horizontal-done-date` }
      >
        { doneDate }
      </p>
      { tagsP }
      <button
        onClick={ shareButton }
        data-testid={ `${index}-horizontal-share-btn` }
        src={ shareIcon }
        alt="share"
      >
        <img src={ shareIcon } alt="share-icon" />
      </button>
      <button onClick={ favoriteButton }>
        <img
          data-testid={ `${index}-horizontal-favorite-btn` }
          src={ checkFavorited(id, type) ? blackHeartIcon : whiteHeartIcon }
          alt="favorite icon"
        />
        Favoritar
      </button>
      <p>
        { clip ? 'Link copied!' : '' }
      </p>
    </div>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  reload: PropTypes.func.isRequired,
  recipe: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    image: PropTypes.string,
    category: PropTypes.string,
    nationality: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    name: PropTypes.string,
    doneDate: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
