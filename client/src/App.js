import React, { useState } from 'react';
import './App.css';
import HomePage from './HomePage/HomePage'
import ResultsPage from './ResultsPage/ResultsPage';
import Particles from 'react-particles-js';

function App() {
  const [results, setResults] = useState(false)
  return (
    <div className="App">
      <div className="background">
        <Particles
          params={{
            "particles": {
              "number": {
                "value": 62,
                "density": {
                  "enable": true,
                  "value_area": 800
                }
              },
              "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                  "enable": false,
                  "speed": 1,
                  "opacity_min": 0.1,
                  "sync": false
                }
              },
              "size": {
                "value": 3,
                "random": true,
                "anim": {
                  "enable": false,
                  "speed": 40,
                  "size_min": 0.1,
                  "sync": false
                }
              }
            }
          }
          }
        />
      </div>
      {!results
        ? <HomePage results={setResults} />
        : <ResultsPage results={results} />}
    </div>
    // <div>Icons made by <a href="https://www.flaticon.com/authors/pixel-buddha" title="Pixel Buddha">Pixel Buddha</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
  );
}

export default App;
