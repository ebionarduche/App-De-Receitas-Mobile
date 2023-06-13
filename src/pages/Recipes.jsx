import React from 'react';
import { useLocation } from 'react-router-dom';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';

function Recipes() {
  const location = useLocation();

  return (
    <div>
      {location.pathname === '/meals' && (
        <div>
          <Meals />
        </div>
      )}
      {location.pathname === '/drinks' && (
        <div>
          <Drinks />
        </div>
      )}
    </div>
  );
}

export default Recipes;
