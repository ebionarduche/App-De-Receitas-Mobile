import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import '../style/RecipeInProgress.css';

function RecipeDetails() {
  const history = useHistory();
  const url = history.location.pathname;
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState('');
  const [titleUrl, setTitleUrl] = useState('');
  const [categoryUrl, setCategoryUrl] = useState('');
  const [ingredientUrl, setIngredientUrl] = useState([]);
  const [instructionsUrl, setInstructionsUrl] = useState([]);
  const [videoUrl, setVideoUrl] = useState('');
  // const [checkbox, setCheckbox] = useState([]);
  const saveCheckeds = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
  const [
    checkedIngredients,
    setCheckedIngredients,
  ] = useState(!saveCheckeds[url] ? [] : saveCheckeds[url]);

  const getIngredients = (data) => {
    const ingredientes = [];
    const max = 20;
    for (let i = 1; i <= max; i += 1) {
      const ingredient = data[`strIngredient${i}`];
      if (ingredient) {
        ingredientes.push(ingredient);
      }
    }
    return ingredientes;
  };

  useEffect(() => {
    // IDs should come from the API response
    let API = '';

    if (url.includes('/meals')) {
      API = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    } if (url.includes('/drinks')) {
      API = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    }

    fetch(API)
      .then((response) => response.json())
      .then((data) => {
        if (url.includes('/meals')) {
          setImageUrl(data.meals[0].strMealThumb);
          setTitleUrl(data.meals[0].strMeal);
          setCategoryUrl(data.meals[0].strCategory);
          setIngredientUrl(getIngredients(data.meals[0]));
          setInstructionsUrl(data.meals[0].strInstructions);
          setVideoUrl(data.meals[0].strYoutube);
        } if (url.includes('/drinks')) {
          setImageUrl(data.drinks[0].strDrinkThumb);

          setTitleUrl(data.drinks[0].strDrink);
          setCategoryUrl(data.drinks[0].strCategory);
          setIngredientUrl(getIngredients(data.drinks[0]));
          setInstructionsUrl(data.drinks[0].strInstructions);
        }
      });
  }, [url]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    const myIngredients = saveCheckeds[url] || [];

    if (checked) {
      setCheckedIngredients(
        (prevCheckedIngredients) => [...prevCheckedIngredients, value],
      );
      myIngredients.push(value);
    } else {
      setCheckedIngredients(
        (prevCheckedIngredients) => prevCheckedIngredients
          .filter((ingredient) => ingredient !== value),
      );
      const index = myIngredients.indexOf(value);
      console.log(index);
      myIngredients.splice(index, 1);
      console.log(myIngredients);
    }
    saveCheckeds[url] = myIngredients;
    localStorage.setItem('inProgressRecipes', JSON.stringify(saveCheckeds));
  };

  return (
    <div>
      <h1 data-testid="recipe-title">{titleUrl}</h1>
      <div>
        <button type="button" data-testid="share-btn">
          <img src={ shareIcon } alt="share icon" />
          Compartilhar
        </button>

        <button type="button" data-testid="favorite-btn">
          Favoritar
        </button>
      </div>

      <h3 data-testid="recipe-category">{categoryUrl}</h3>
      <h2>Ingredients</h2>

      {
        ingredientUrl.map((ingredient, index) => (
          <label
            className="container-ingredients"
            data-testid={ `${index}-ingredient-step` }
            htmlFor={ `checkbox-${index}` }
            key={ index }
            style={ checkedIngredients.includes(ingredient)
              ? { textDecoration: 'line-through', color: 'black' } : {} }
          >
            <input
              type="checkbox"
              value={ ingredient }
              onChange={ (e) => handleCheckboxChange(e) }
              id={ `checkbox-${index}` }
              name={ `checkbox-${index}` }
              defaultChecked={ checkedIngredients.includes(ingredient) }
            />
            {ingredient}
          </label>
        ))
      }

      <h1>instructions</h1>
      <p data-testid="instructions">{instructionsUrl}</p>
      <div>
        {url.includes('/meals') && videoUrl && (
          <track
            data-testid="video"
            width="420"
            height="315"
            src={ videoUrl }
          />
        )}
      </div>
      {imageUrl && (
        <img
          className="img-recipe"
          src={ imageUrl }
          alt="Recipe"
          data-testid="recipe-photo"
        />
      )}
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finish Recipe
      </button>

    </div>

  );
}

//

export default RecipeDetails;
