import React, { useState } from 'react';
import {Toplog, Bottom} from './App.js';
import './EasterEgg.css';
import MainPage from './MainPage';
import background from "./front-page-background.png"


const EasterEgg = () => {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0);
  
    if (count === 3){
      alert("3 reached!");
      return (
        <div>
          <Toplog />
          <MainPage />
          <Bottom />
        </div>
      )
    }
    return (
      <div className="App" >
        
        <header className="App-header" >
        
        <div className="background" style={{ backgroundImage:`url(${background})` }}>
          <p>clicked {count} yes </p>
            <button id="easterButton" onClick={() => setCount(count + 1)}></button>
        </div>
        
       
        </header>
       
      </div>
    )
  }

  export default EasterEgg;
