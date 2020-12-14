import React from 'react';
import './App.css';
import Router from './routes';

function App() {
  sessionStorage.clear();
  return (
      <Router></Router>
    );
}

export default App;
