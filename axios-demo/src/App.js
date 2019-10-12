import React, { Component } from 'react';
import './App.css';
import ReactTableComponent from './components/ReactTableComponent';

function App() {
  return (
    <React.Fragment>
      <h2 className="text-center">Employee Details</h2>
      <ReactTableComponent />
    </React.Fragment>
  );
}

export default App;
