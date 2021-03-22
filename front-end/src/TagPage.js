import React from 'react'
import './TagPage.css'


const TagPage = (props) => {
    const calls = props.calls.map(call =>
      <Call callName={call.callName} link={call.link} duration={call.duration} numPeople={call.numPeople} />
    )
    return (
        <div className="page">
          <div className="grayButton">
            LIST OF CALLS
          </div>
          <div className="callsList">
            {calls}
          </div>
          <div className="grayButton">
            <a href="">
              LOAD MORE CALLS WITH TAG XXXX
            </a>
          </div>
        </div>
    )
}


const Call = (props) => {
    return (
      <div className="call">
        <a className="link" href={props.link}>
          {props.callName}
        </a>
        <div className="stats">
          <div className="duration">
            Call Duration: {props.duration}
          </div>
          <div className="people">
            Number of People: {props.numPeople}
          </div>
        </div>
      </div>
    )
  }

  export default TagPage
