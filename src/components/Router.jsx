import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../pages/Login';
import Recipes from '../pages/Recipes';
import Profile from '../pages/Profile';

function Router() {
  return (
    <main>
      <Route exact path="/" component={ Login } />
      <Route exact path="/recipes" component={ Recipes } />
      <Route exact path="/profile" component={ Profile } />
    </main>
  );
}

export default Router;
