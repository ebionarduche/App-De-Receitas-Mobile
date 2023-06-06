import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Recipes from '../pages/Recipes';
import Profile from '../pages/Profile';
import Drinks from '../pages/Drinks';
import Meals from '../pages/Meals';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';

function Router() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/recipes" component={ Recipes } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default Router;
