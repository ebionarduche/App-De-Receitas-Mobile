import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from './components/Router';
import SearchProvider from './context/SearchProvider';

function App() {
  return (
    <SearchProvider>
      <div className="meals">
        <span className="logo">TRYBE</span>
        <Router />
      </div>
    </SearchProvider>
  );
}

export default App;
