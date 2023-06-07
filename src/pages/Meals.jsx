import { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Meals.css';

function Meals() {
  const [recipesMeals, SetRecipesMeals] = useState([]);
  const { RecipesResult, isLoading } = useContext(RecipesContext);

  const startPage = () => {
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
    <div>
      <Header title="Meals" btnProfile btnSearch />
      {
        isLoading ? 'Carregando...' : (
          recipesMeals.map(({ idMeal, strMealThumb, strMeal }, index) => (
            <div key={ idMeal }>
              <button
                className="custom-button"
                key={ idMeal }
                data-testid={ `${index}-recipe-card` }
                onClick={ () => handleClick(idMeal) }
                onKeyDown={ (event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    handleClick(idMeal);
                  }
                } }
                tabIndex={ 0 }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ strMealThumb }
                  alt={ strMeal }
                  width="100px"
                />
                <span data-testid={ `${index}-card-name` }>{strMeal}</span>
              </button>
            </div>)))
      }
      <Footer />

    </div>
  );
}

export default Meals;
