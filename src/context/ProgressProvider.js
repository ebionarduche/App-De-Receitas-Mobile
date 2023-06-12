import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';

import ProgressContext from './ProgressContext';

export default function ProgressProvider({ children }) {
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    // Array de receitas feitas inicial
    const initialDoneRecipes = [
      {
        // Observar a estrutura do objeto
        id: '52771',
        type: 'meal',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        doneDate: '23/06/2020',
        tags: 'Pasta,Curry',
      },
      {
        id: '178319',
        type: 'drink',
        nationality: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
        doneDate: '23/06/2020',
        tags: '',
      },
    ];
    // Iniciando o state com um array contendo apenas este mesmo recipe duas vezes
    // (Requisito pediu assim)
    setDoneRecipes(initialDoneRecipes);
  }, []);

  const initialState = useMemo(() => ({
    doneRecipes, // Array de receitas feitas
    setDoneRecipes, // seta o Array de receitas feitas
  }), [doneRecipes]);

  return (
    <ProgressContext.Provider value={ initialState }>
      <div>
        { children }
      </div>
    </ProgressContext.Provider>
  );
}

ProgressProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
