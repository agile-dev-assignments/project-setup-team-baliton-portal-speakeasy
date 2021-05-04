import React, { useState } from 'react';
import './EasterEgg.css';
import background from "./images/front-page-background.png"
import { useHistory } from "react-router-dom";
import MobileMediaQuery from "./MobileMediaQuery";


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
              <button id="easterButton" onClick={() => setCount(count + 1)}>
          <MobileMediaQuery></MobileMediaQuery>
          </button>
        </header>
      </div>
    )
  }

  export default EasterEgg;
