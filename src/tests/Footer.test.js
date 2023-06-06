import React from 'react';
import Recipes from '../pages/Recipes';

discribe('Testes para 90% de cobertura do Footer;', () => {
  it('Testando se os botões são renderizados em recipes:', () => {
    render(<Recipes />);
  });
});
