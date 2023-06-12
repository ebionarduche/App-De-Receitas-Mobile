import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';

import ProgressContext from './ProgressContext';

export default function ProgressProvider({ children }) {
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    const initialDoneRecipe = {
      // Receita feita inicial
      // Observar a estrutura do objeto
      thumbnail: 'http://imagemDaReceita.com',
      category: 'Categoria da receita',
      name: 'Nome da receita',
      dateDone: 'Data que a receita foi feita',
      strTags: 'Pasta,Curry,Tag3,TagN',
    };
    // Iniciando o state com um array contendo apenas este mesmo recipe duas vezes
    // (Requisito pediu assim)
    setDoneRecipes([initialDoneRecipe, initialDoneRecipe]);
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
