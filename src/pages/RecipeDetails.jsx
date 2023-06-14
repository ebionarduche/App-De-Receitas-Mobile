import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import '../style/Recipe.css';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import CarouselCard from '../components/CarouselCard';

function RecipeDetails() {
  const { id } = useParams();
  const history = useHistory();
  const url = history.location.pathname;
  const [imageUrl, setImageUrl] = useState('');
  const [titleUrl, setTitleUrl] = useState('');
  const [categoryUrl, setCategoryUrl] = useState('');
  const [ingredientUrl, setIngredientUrl] = useState([]);
  const [instructionsUrl, setInstructionsUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [alcoholicUrl, setAlcoholicUrl] = useState('');
  const [nationalityUrl, setNationalityUrl] = useState('');
  const [copyMessage, setCopyMessage] = useState('');

  const getIngredients = (data) => {
    const ingredientes = [];
    const max = 20;
    for (let i = 1; i <= max; i += 1) {
      const ingredient = data[`strIngredient${i}`];
      const measure = data[`strMeasure${i}`];
      if (ingredient && measure) {
        ingredientes.push({ ingredient, measure });
      }
    }
    return ingredientes;
  };

  const handleClick = () => {
    if (url.includes(`/meals/${id}`)) {
      history.push(`/meals/${id}/in-progress`);
    } else if (url.includes(`/drinks/${id}`)) {
      history.push(`/drinks/${id}/in-progress`);
    }
  };

  useEffect(() => {
    let API = '';

    if (url.includes(`/meals/${id}`)) {
      API = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    } else if (url.includes(`/drinks/${id}`)) {
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
          setNationalityUrl(data.meals[0].strArea);
        } else if (url.includes('/drinks')) {
          setImageUrl(data.drinks[0].strDrinkThumb);
          setTitleUrl(data.drinks[0].strDrink);
          setCategoryUrl(data.drinks[0].strCategory);
          setIngredientUrl(getIngredients(data.drinks[0]));
          setInstructionsUrl(data.drinks[0].strInstructions);
          setAlcoholicUrl(data.drinks[0].strAlcoholic);
          setNationalityUrl('');
        }
      });
  }, [id, url]);

  const handleFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

    const favoriteRecipe = {
      id,
      type: '',
      nationality: nationalityUrl,
      category: categoryUrl,
      alcoholicOrNot: '',
      name: titleUrl,
      image: imageUrl,
    };

    if (url.includes('/meals')) {
      favoriteRecipe.type = 'meal';
      favoriteRecipe.alcoholicOrNot = '';
    } else {
      favoriteRecipe.type = 'drink';
      favoriteRecipe.alcoholicOrNot = alcoholicUrl;
    }

    // Verifica se a receita já está nos favoritos pelo ID
    const recipeExists = favoriteRecipes.find(
      (favRecipe) => favRecipe.id === favoriteRecipe.id,
    );

    if (recipeExists === undefined) {
      favoriteRecipes.push(favoriteRecipe);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
      console.log('Receita adicionada aos favoritos.');
    }
  };

  const buttonText = () => {
    let button = '';
    const continueRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
    if (continueRecipes === []) {
      button = 'Start';
    } else {
      button = 'Continue';
    } return button;
  };

  const handleShare = () => {
    const link = window.location.href;
    clipboardCopy(link);
    setCopyMessage('Link copied!');
  };

  return (
    <div>
      <h1>{id}</h1>
      <p data-testid="recipe-title">{titleUrl}</p>
      {url.includes('/meal') && titleUrl && (
        <p data-testid="recipe-category">{categoryUrl}</p>
      )}
      <div>
        <button
          type="button"
          data-testid="share-btn"
          onClick={ handleShare }
        >
          <img src={ shareIcon } alt="share icon" />
          Compartilhar
        </button>
        <p>{copyMessage}</p>

        <button
          type="button"
          data-testid="favorite-btn"
          onClick={ handleFavorite }
        >
          Favoritar
        </button>
      </div>
      <p data-testid="instructions">{instructionsUrl}</p>
      {url.includes('/drinks') && instructionsUrl && (
        <p data-testid="recipe-category">{alcoholicUrl}</p>
      )}
      {ingredientUrl.map((ingredient, index) => (
        <div key={ index }>
          <p
            data-testid={
              `${index}-ingredient-name-and-measure`
            }
          >
            {`${ingredient.measure} ${ingredient.ingredient}`}
          </p>
        </div>
      ))}
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
      <CarouselCard />
      <button
        type="button"
        data-testid="start-recipe-btn"
        style={ { position: 'fixed', bottom: '0px' } }
        onClick={ () => handleClick() }
      >
        {`${buttonText()} Recipe`}
      </button>

    </div>

  );
}

export default RecipeDetails;
