import { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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

  const history = useHistory();

  const handleClick = (recipeId) => {
    history.push(`/drinks/${recipeId}`);
  };

  useEffect(() => {
    startPage();
  }, [isLoading]);

  return (
    <div className="container">
      <Header title="Drinks" btnProfile btnSearch />
      <div className="cards-container">
        {
          isLoading ? 'Carregando...' : (
            recipesDrinks.map(({ idDrink, strDrinkThumb, strDrink }, index) => (
              <div className="card" key={ idDrink }>
                <button
                  className="custom-button"
                  data-testid={ `${index}-recipe-card` }
                  onClick={ () => handleClick(idDrink) }
                >
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ strDrinkThumb }
                    alt={ strDrink }
                    width="105px"
                  />
                  <span data-testid={ `${index}-card-name` }>{strDrink}</span>
                </button>
              </div>)))
        }
      </div>
      <Footer />
    </div>
  );
}

export default Drinks;
