import React, { useState, useEffect} from "react";
//import { render } from '../../back-end/app'
import './RecentCallsPage.css'
import NoCallsImage from './images/noCallsImage.jpg';


const displayTime = (dateAndTime) => {
  let current = Date.now();
  let duration = current - Date.parse(dateAndTime);
  return Math.round(duration / (60 * 1000));
}

function RecentCallsPage() {

  const [recentCallList, setRecentCallList] = useState([]);
  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch('http://159.65.182.78:5000/recentCallList')
      .then(response => response.json())
      .then(data => setRecentCallList([...data]))
      .catch(error => {
        console.error('There was an error with /recentCallList !!', error);
      });

  // empty dependency array means this effect will only run once (when page/component is loaded)
  }, []);

  let numberOfRecentCalls = recentCallList.length;

  if (numberOfRecentCalls === 0) {
    return (
      <div className="page">
        <div className="grayButton">
          No On-Going Calls!
        </div>
        <img className="no-calls-image" alt="" src={NoCallsImage} />
        <div className="grayButton">
          <a href="/recent">
            Refresh
          </a>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className="page">
        <div className="grayButton">
          {numberOfRecentCalls + " On Going Calls!"}
        </div>
        <div className="callsList">
          {recentCallList.map(call => {
            return (
              <Call key={call.callID} onGoing={call.onGoing} callName={call.callTitle} 
              link={"/chatroom?id=" + call.callID + "?title=" + call.callTitle} duration={displayTime(call.timeStarted)} numPeople="0"
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
}

const Call = (props) => {
  const tagpageLink = "/tagpage/" + props.callTag
  return (
    <div key={props.callName} className="call">
      <a className="link" href={props.link}>
        <p className="link-text">{props.callName}</p>
      </a>
      <div className="stats">
        <div className="duration">
          <p className="paragraph-info">
            Duration: {props.duration} min
          </p>
        </div>
        <div className="people">
          <p className="paragraph-info">
            <a href={tagpageLink}>
              Tag: {props.callTag}
            </a>
          </p>
        </div>
      </div>
    </div>
  )
  
}

export default RecentCallsPage;
export { displayTime };
