import { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchContext from '../context/SearchContext';

function Drinks() {
  const [recipesDrinks, SetRecipesDrinks] = useState([]);
  const [renderCategory, setRenderCategory] = useState([]);
  const { RecipesResult, isLoading, Categorys } = useContext(RecipesContext);
  const { searchResult, searched } = useContext(SearchContext);

  const startPage = () => {
    const five = 5;
    const fivecategorys = Categorys.slice(0, five);
    setRenderCategory(fivecategorys);
    const twelve = 12;
    const data = searched ? searchResult : RecipesResult;
    const twelveCards = data.slice(0, twelve);
    SetRecipesDrinks(twelveCards);
  };

  const history = useHistory();

  const handleClick = (recipeId) => {
    history.push(`/drinks/${recipeId}`);
  };

  useEffect(() => {
    startPage();
  }, [isLoading, searched]);

  return (
    <div className="container">
      <Header title="Drinks" btnProfile btnSearch />
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
          isLoading ? 'Carregando...' : (
            recipesDrinks.map(({ idDrink, strDrinkThumb, strDrink }, index) => (
              <div className="card" key={ strDrink + idDrink }>
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
        <Footer />
      </div>
    </div>
  );
}

export default Drinks;
