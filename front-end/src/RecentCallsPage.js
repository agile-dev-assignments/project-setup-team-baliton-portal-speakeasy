import React, { useState, useEffect} from "react";
//import { render } from '../../back-end/app'
import './RecentCallsPage.css'


function RecentCallsPage() {

  const [recentCallList, setRecentCallList] = useState([]);

  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch('http://localhost:5000/recentCallList')
      .then(response => response.json())
      .then(data => setRecentCallList([...data]))
      .catch(error => {
        console.error('There was an error with /recentCallList !!', error);
      });

  // empty dependency array means this effect will only run once (when page/component is loaded)
  }, []);

  

  return (
    <div className="page">
      <div className="grayButton">
        LIST OF RECENT CALLS
      </div>
      <div className="callsList">
        {recentCallList.map(call => {
          return (
            <Call key={call.callID} onGoing={call.onGoing} callName={call.callName} 
            link={"/chatroom/" + call.callID} duration={call.startTime} numPeople="0"
            callTag={call.callTag}/>
          )
        })}
      </div>
      <div className="grayButton">
        <a href="/recent">
          Refresh
        </a>
      </div>
    </div>
  );
  
}

const Call = (props) => {
  return (
    <div className="call">
      <a className="link" href={props.link}>
        {props.callName + ", tag: " + props.callTag}
      </a>
      <div className="stats">
        <div className="duration">
          Start Time: {props.duration}
        </div>
        <div className="people">
          Number of People: {props.numPeople}
        </div>
      </div>
    </div>
  )
  
}

export default RecentCallsPage;
