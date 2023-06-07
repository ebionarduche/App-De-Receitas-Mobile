import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import '../style/Recipe.css';

function RecipeDetails() {
  const { id } = useParams();
  const history = useHistory();
  const url = history.location.pathname;
  const [imageUrl, setImageUrl] = useState('');
  const [titleUrl, setTitleUrl] = useState('');
  const [categoryUrl, setCategoryUrl] = useState('');
  const [ingredientUrl, setIngredientUrl] = useState('');
  const [instructionsUrl, setInstructionsUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

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
    const idMeal = 52977;
    const idDrink = 11007;
    let API = '';

    if (url.includes('/meals')) {
      API = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
      console.log(API);
    } if (url.includes('/drinks')) {
      API = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`;
      console.log(API);
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

  return (
    <div>
      <h1>{id}</h1>
      <p data-testid="recipe-title">{titleUrl}</p>
      <p data-testid="recipe-category">{categoryUrl}</p>
      <p data-testid="${ingredientes[i]}-ingredient-name-and-measure">{ingredientUrl}</p>
      <p data-testid="instructions">{instructionsUrl}</p>
      <div>
        {url.includes('/meals') && videoUrl && (
          // <video controls>
          //   <source src={ videoUrl } type="video/mp4" />
          // </video>
          <iframe
            width="420"
            height="315"
            src={ videoUrl }
          />
        )}
      </div>
      {imageUrl && <img
        className="img-recipe"
        src={ imageUrl }
        alt="Recipe"
        data-testid="recipe-photo"
      />}

    </div>
  );
}

export default RecipeDetails;
