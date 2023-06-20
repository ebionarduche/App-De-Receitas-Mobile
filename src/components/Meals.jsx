import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import SearchContext from '../context/SearchContext';
import Header from './Header';
import Footer from './Footer';
import './Recipes.css';
import Card from './Card';

function Meals() {
  const [renderCategory, setRenderCategory] = useState([]); // Renderiza os botões
  const [toggle, setToggle] = useState(''); // Toggle categories

  const {
    renderRecipes, // Renderiza as receitas na tela
    setRenderRecipes, // Seta o valor de Render para a Renderização inicial
    MealsResult, // Resultado da API Renderização inicial
    isLoading,
    mealsCategorys, // Resultado da API p/botões categorias
    fetchCategorysOnClick, // função que chama na API de categorys
  } = useContext(RecipesContext);

  const { searchResult, searched } = useContext(SearchContext);

  const startPage = () => {
    const five = 5;
    const fivecategorys = mealsCategorys.slice(0, five);
    setRenderCategory(fivecategorys);
    const twelve = 12;
    const data = searched ? searchResult : MealsResult;
    const twelveCards = data.slice(0, twelve);
    setRenderRecipes(twelveCards);
  };

  const history = useHistory();

  const handleClick = (recipeId) => {
    history.push(`/meals/${recipeId}`);
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
      <Header title="Meals" btnProfile btnSearch />
      <section className="buttons-container">
        <div>
          <button
            type="button"
            data-testid="All-category-filter"
            value="All"
            onClick={ ({ target }) => selectCategory(target.value) }
          >
            <div className="btn-category-all">
              All
            </div>
          </button>
        </div>
        {
          renderCategory.map(({ strCategory }, index) => (
            <div
              key={ strCategory + index }
            >
              <button
                data-testid={ `${strCategory}-category-filter` }
                onClick={ () => selectCategory(strCategory) }
              >
                <div className={ `btn-category-${strCategory.toLowerCase()}` }>
                  {strCategory}
                </div>
              </button>
            </div>
          ))
        }
      </section>

      <div className="cards-container">
        {
          isLoading ? (
            'Carregando...'
          ) : (
            renderRecipes.map(({ idMeal, strMealThumb, strMeal }, index) => {
              if (!idMeal) {
                return '';
              }
              return (
                <Card
                  key={ strMeal + idMeal }
                  id={ idMeal }
                  thumbnail={ strMealThumb }
                  name={ strMeal }
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

export default Meals;
