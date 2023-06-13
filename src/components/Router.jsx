import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Recipes from '../pages/Recipes';
import Profile from '../pages/Profile';
import RecipeInProgress from '../pages/RecipeInProgress';
// import Drinks from '../pages/Drinks';
// import Meals from '../pages/Meals';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import RecipeDetails from '../pages/RecipeDetails';

function Router() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Recipes } />
      <Route exact path="/drinks" component={ Recipes } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/:recipes/:id" component={ RecipeDetails } />
      <Route exact path="/:recipes/:id/in-progress" component={ RecipeInProgress } />
    </Switch>
  );
}

export default Router;
