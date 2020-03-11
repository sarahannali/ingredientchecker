import React, { useState } from 'react';
import './App.css';
import HomePage from './HomePage/HomePage'
import Header from './Header/Header'
import ResultsPage from './ResultsPage/ResultsPage';

function App() {
  const [results, setResults] = useState(false)
  return (
    <div className="App">
      <Header />
      {!results
        ? <HomePage results={setResults}/>
        : <ResultsPage results={results}/>}
    </div>
  );
}

export default App;
