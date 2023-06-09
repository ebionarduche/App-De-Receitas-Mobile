import { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Recipes.css';
import Card from '../components/Card';

function Meals() {
  const [recipesMeals, SetRecipesMeals] = useState([]);
  const [renderCategory, setRenderCategory] = useState([]);
  const [toggleFilter, setTogglerFilter] = useState(false);
  // Preciso acertar a url na parte do provider URL de categorys Q precida d CCCC
  // Preciso tornar o valor recipes dinâmico, recebendo o valor de filterCategorys quando é clicado no botão e recipesResult

  const {
    RecipesResult, // Resultado da primeira requesição
    filterCategorys, // resultado da API quando é clicado nas categorias
    isLoading,
    Categorys, // Categorias que vem de API
    fetchCategorysOnClick, // função que chama na API de categorys
  } = useContext(RecipesContext);

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

  const ToggleFilterCategory = () => {
    if (toggleFilter === false) {
      setTogglerFilter(true);
    } else {
      setTogglerFilter(false);
    }
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
            key={ index }
            onClick={ () => {
              fetchCategorysOnClick(strCategory);
              ToggleFilterCategory();
            } }
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
              <Card
                key={ index }
                id={ idMeal }
                thumbnail={ strMealThumb }
                name={ strMeal }
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

export default Meals;
