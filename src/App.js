import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from './components/Router';

function App() {
  return (
    <div className="meals">
      <span className="logo">TRYBE</span>
      <Router />
    </div>
  );
}

export default App;
