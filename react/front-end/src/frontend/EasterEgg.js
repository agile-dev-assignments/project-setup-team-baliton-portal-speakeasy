import React, { useState } from 'react';
import './EasterEgg.css';
import background from "./images/front-page-background.png"
import { useHistory } from "react-router-dom";

const EasterEgg = () => {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0);
  
    const history = useHistory();
    if (count === 3){
      let path = '/main';
      history.push(path);
      return (<div></div>)
    }
    return (
      <div className="easter" id="easterDiv" >
        <header className="App-header" >
          <div className="background" style={{ backgroundImage:`url(${background})` }}>
          <p id="counter">clicked {count} yes </p>
              <button id="easterButton" onClick={() => setCount(count + 1)}></button>
          </div>
        </header>
      </div>
    )
  }

  export default EasterEgg;
