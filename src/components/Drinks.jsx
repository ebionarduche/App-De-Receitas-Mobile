import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import SearchContext from '../context/SearchContext';
import Footer from './Footer';
import Header from './Header';
import Card from './Card';

function Drinks() {
  const [renderCategory, setRenderCategory] = useState([]); // Renderiza os botões
  // const [recipesDrinks, SetRecipesDrinks] = useState([]);
  const [toggle, setToggle] = useState(''); // Toggle categories

  const {
    renderRecipes, // Renderiza as receitas na tela
    setRenderRecipes, // Seta o valor de Render para a Renderização inicial
    DrinksResult, // Resultado da API Renderização inicial
    isLoading,
    drinksCategorys, // Resultado da API p/botões categorias
    fetchCategorysOnClick, // função que chama na API de categorys
  } = useContext(RecipesContext);

  const { searchResult, searched } = useContext(SearchContext);

  const startPage = () => {
    const five = 5;
    const fivecategorys = drinksCategorys.slice(0, five);
    setRenderCategory(fivecategorys);
    const twelve = 12;
    const data = searched ? searchResult : DrinksResult;
    const twelveCards = data.slice(0, twelve);
    setRenderRecipes(twelveCards);
  };

  const history = useHistory();

  const handleClick = (recipeId) => {
    history.push(`/drinks/${recipeId}`);
  };

  useEffect(() => {
    startPage();
  }, [isLoading, searched]);

  const selectCategory = (category) => {
    setToggle(category);
    const onlyCategory = renderCategory
      .some(({ strCategory }) => strCategory === category);
    if (toggle === category) {
      return startPage();
    }

    if (category === 'All') {
      console.log('Entrei no All');
      startPage();
    }
    if (onlyCategory) {
      fetchCategorysOnClick(category);
    }
  };

  return (
    <div className="container">
      <Header title="Drinks" btnProfile btnSearch />
      <div className="buttons-container">
        <button
          type="button"
          data-testid="All-category-filter"
          value="All"
          onClick={ ({ target }) => selectCategory(target.value) }
        >
          All
        </button>
        {
          renderCategory.map(({ strCategory }, index) => (
            <button
              key={ strCategory + index }
              className="category-button"
              data-testid={ `${strCategory}-category-filter` }
              onClick={ () => selectCategory(strCategory) }
            >
              {strCategory}
            </button>
          ))
        }
      </div>
      <div className="cards-container">
        {
          isLoading ? 'Carregando...' : (
            renderRecipes.map(({ idDrink, strDrinkThumb, strDrink }, index) => {
              if (!idDrink) {
                return '';
              }
              return (
                <Card
                  key={ strDrink + idDrink }
                  id={ idDrink }
                  thumbnail={ strDrinkThumb }
                  name={ strDrink }
                  index={ index }
                  handleClick={ handleClick }
                />
              );
            })
          )
        }
        <Footer />
      </div>
    </div>
  );
}

export default Drinks;
