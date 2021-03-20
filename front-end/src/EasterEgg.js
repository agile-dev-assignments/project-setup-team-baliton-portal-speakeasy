import React, { useState } from 'react';
import './EasterEgg.css';

import background from "./front-page-background.png"


const EasterEgg = () => {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0);
  
    if (count === 3){
      alert("3 reached!");
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
