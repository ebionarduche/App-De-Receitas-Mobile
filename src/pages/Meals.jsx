import { useContext, useState, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Meals() {
  const [recipesMeals, SetRecipesMeals] = useState([]);
  const { RecipesResult, isLoading } = useContext(RecipesContext);

  const startPage = () => {
    const twelve = 12;
    const twelveCards = RecipesResult.slice(0, twelve);
    SetRecipesMeals(twelveCards);
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
            <div
              key={ idMeal }
              data-testid={ `${index}-recipe-card` }
            >
              <span data-testid={ `${index}-card-name` }>{strMeal}</span>
              <img
                data-testid={ `${index}-card-img` }
                src={ strMealThumb }
                alt={ strMeal }
                width="100px"
              />
            </div>)))
      }
      <Footer />

    </div>
  );
}

export default Meals;
