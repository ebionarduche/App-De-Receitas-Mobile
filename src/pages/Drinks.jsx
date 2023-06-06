import { useContext, useState, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Drinks() {
  const [recipesDrinks, SetRecipesDrinks] = useState([]);
  const { RecipesResult, isLoading } = useContext(RecipesContext);

  const startPage = () => {
    const twelve = 12;
    const twelveCards = RecipesResult.slice(0, twelve);
    SetRecipesDrinks(twelveCards);
  };

  useEffect(() => {
    startPage();
  }, [isLoading]);

  return (
    <div>
      <Header title="Drinks" btnProfile btnSearch />
      {
        isLoading ? 'Carregando...' : (
          recipesDrinks.map(({ idDrink, strDrinkThumb, strDrink }, index) => (
            <div
              key={ idDrink }
              data-testid={ `${index}-recipe-card` }
            >
              <span data-testid={ `${index}-card-name` }>{strDrink}</span>
              <img
                data-testid={ `${index}-card-img` }
                src={ strDrinkThumb }
                alt={ strDrink }
                width="105px"
              />
            </div>)))
      }
      <Footer />
    </div>
  );
}

export default Drinks;
