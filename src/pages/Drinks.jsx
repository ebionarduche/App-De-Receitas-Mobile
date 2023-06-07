import { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Card from '../components/Card';

function Drinks() {
  const [recipesDrinks, SetRecipesDrinks] = useState([]);
  const [renderCategory, setRenderCategory] = useState([]);
  const { RecipesResult, isLoading, Categorys } = useContext(RecipesContext);

  const startPage = () => {
    const five = 5;
    const fivecategorys = Categorys.slice(0, five);
    setRenderCategory(fivecategorys);
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
      {
        renderCategory.map(({ strCategory, index }) => (
          <button
            key={ index }
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
              <Card
                key={ index }
                id={ idDrink }
                thumbnail={ strDrinkThumb }
                name={ strDrink }
                index={ index }
                handleClick={ handleClick }
              />
            ))
          )
        }
        <Footer />
      </div>
    </div>
  );
}

export default Drinks;
