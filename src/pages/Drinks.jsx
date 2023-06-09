import { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Card from '../components/Card';

function Drinks() {
  const [renderCategory, setRenderCategory] = useState([]); // Renderiza os botões
  const {
    renderRecipes, // Renderiza as receitas na tela
    setRenderRecipes, // Seta o valor de Render para a Renderização inicial
    RecipesResult, // Resultado da API Renderização inicial
    isLoading,
    Categorys, // Resultado da API p/botões categorias
  } = useContext(RecipesContext);

  const startPage = () => {
    const five = 5;
    const fivecategorys = Categorys.slice(0, five);
    setRenderCategory(fivecategorys);
    const twelve = 12;
    const twelveCards = RecipesResult.slice(0, twelve);
    setRenderRecipes(twelveCards);
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
      <div className="buttons-container">
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ startPage }
        >
          All
        </button>
        {
          renderCategory.map(({ strCategory, index }) => (
            <button
              key={ index }
              data-testid={ `${strCategory}-category-filter` }
              onClick={ () => {
                fetchCategorysOnClick(strCategory);
              } }
            >
              {strCategory}
            </button>
          ))
        }
      </div>
      <div className="cards-container">
        {
          isLoading ? 'Carregando...' : (
            renderRecipes.map(({ idDrink, strDrinkThumb, strDrink }, index) => (
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
