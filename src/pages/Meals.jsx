import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Recipes.css';

function Meals() {
  const [recipesMeals, SetRecipesMeals] = useState([]);
  const [renderCategory, setRenderCategory] = useState([]);
  const { RecipesResult, isLoading, Categorys } = useContext(RecipesContext);

  const startPage = () => {
    const five = 5;
    const fivecategorys = Categorys.slice(0, five);
    setRenderCategory(fivecategorys);
    const twelve = 12;
    const twelveCards = RecipesResult.slice(0, twelve);
    SetRecipesMeals(twelveCards);
  };

  const history = useHistory();

  const handleClick = (recipeId) => {
    history.push(`/meals/${recipeId}`);
  };

  useEffect(() => {
    startPage();
  }, [isLoading]);

  return (
    <div className="container">
      <Header title="Meals" btnProfile btnSearch />
      {
        renderCategory.map(({ strCategory, index }) => (
          <button
            key={ strCategory + index }
            data-testid={ `${strCategory}-category-filter` }
          >
            {strCategory}
          </button>
        ))
      }
      <div className="cards-container">
        {
          isLoading ? (
            'Carregando...'
          ) : (
            recipesMeals.map(({ idMeal, strMealThumb, strMeal }, index) => (
              <div className="card" key={ strMeal + idMeal }>
                <button
                  className="custom-button"
                  data-testid={ `${index}-recipe-card` }
                  onClick={ () => handleClick(idMeal) }
                >
                  <h6 data-testid={ `${index}-card-name` }>{strMeal}</h6>
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ strMealThumb }
                    alt={ strMeal }
                    width="100px"
                  />
                </button>
              </div>
            ))
          )
        }
        <Footer />
      </div>
    </div>
  );
}

export default Meals;
