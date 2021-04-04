import React, { useState, useEffect} from "react";
//import { render } from '../../back-end/app'
import './RecentCallsPage.css'


function RecentCallsPage() {
  //LEGACY OLD FAKE DATA
  //  const calls = props.calls.map(call =>
  //    <Call callName={call.callName} link={call.link} duration={call.duration} numPeople={call.numPeople} />
  //  )

  const [recentCallList, setRecentCallList] = useState([]);
  
  /*constructor(props) {
      super(props);
      this.state = {
        recentCallList: []
      }
  }
  */

  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch('http://localhost:5000/recentCallList')
      .then(response => response.json())
      .then(data => setRecentCallList([...data]))
      .catch(error => {
        console.error('There was an error with /recentCallList !!', error);
      });
      //.then(async response => {
        
        /*const data = await response.json();

        // check for error response
        if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        setRecentCallList(data)
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
      */

  // empty dependency array means this effect will only run once (when page/component is loaded)
  }, []);

  recentCallList.sort((a, b) => {
    return moreRecent(a.startTime, b.startTime);
  });

  return (
    <div className="page">
      <div className="grayButton">
        LIST OF RECENT CALLS
      </div>
      <div className="callsList">
        {recentCallList.map(call => {
          return (
            <Call key={call.callID} onGoing={call.onGoing} callName={call.callName} link={"/chatroom/" + call.callID} duration={call.startTime} numPeople="0"/>
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
  if (props.onGoing) {
    return (
      <div className="call">
        <a className="link" href={props.link}>
          {props.callName}
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
  else {
    return null;
  }
  
}

//helper function to help in sorting call list
//takes two strings fomatted XX:XX:XX or X:XX:XX
//returns 1 if a is more recent, -1 if b is more recent
//and zero if they are equal
function moreRecent(a, b) {
  let aArr = a.split(":");
  let bArr = b.split(":");

  if (parseInt(aArr[0]) < parseInt(bArr[0])) {
    return 1;
  } 
  else if (parseInt(aArr[0]) > parseInt(bArr[0])) {
    return -1;
  }
  else if (parseInt(aArr[1]) < parseInt(bArr[1])) {
    return 1;
  }
  else if (parseInt(aArr[1]) > parseInt(bArr[1])) {
    return -1;
  }
  else if (parseInt(aArr[2]) < parseInt(bArr[2])) {
    return 1;
  }
  else if (parseInt(aArr[2]) > parseInt(bArr[2])) {
    return -1;
  }
  else {
    return 0;
  }
}

export default RecentCallsPage;

