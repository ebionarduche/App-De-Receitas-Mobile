import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../pages/Login';
import Recipes from '../pages/Recipes';

function Router() {
  return (
    <main>
      <Route exact path="/" component={ Login } />
      <Route exact path="/recipes" component={ Recipes } />
    </main>
  );
}

export default Router;
