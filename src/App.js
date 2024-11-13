import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Complain from './Complain';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Complain />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;

