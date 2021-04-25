import React, { useState, useEffect} from 'react'
import './TagList.css'
import { Link } from 'react-router-dom';
import NoCallsImage from './images/noCallsImage.jpg';

function TagList() {

  const [distinctTagsList, setDistinctTagsList] = useState([]);

  useEffect(() => {
    //get request for distinc calls using fetch inside useEffect react hook
    fetch('http://localhost:5000/getDistinctTags')
      .then(response => response.json())
      .then(data => setDistinctTagsList([...data]))
      .catch(error => {
        console.error('There was an error with /getDistinctTags !!', error);
      });

  //empty dependency array so this will only run once; when the page/component is loaded
  }, [])

  let numberOfDistinctTags = distinctTagsList.length;
  
  if (numberOfDistinctTags === 0) {
    return (
      <div className="page">
        <div className="grayButton">
          No Tags with On Going Calls!
        </div>
        <img className="no-calls-image" alt="" src={NoCallsImage} />
        <div className="grayButton">
          <a href="/taglist">
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
            {numberOfDistinctTags + " Distinct Tags!"}
          </div>
          <div className="tagList">
            {distinctTagsList.map(callTag => {
              return (
                <Tag tagName={callTag} 
                  key={callTag}
                  link={callTag}
                  numCalls='X' 
                  numPeople='X' />
              )
            })}
          </div>
          <div className="grayButton">
            <a href="/taglist">
              Refresh
            </a>
          </div>
        </div>
    )
  }
}


const Tag = (props) => {
    return (
      <div key={props.tagName} className="tag">
        <Link className="link"
        to={{
          pathname:'/tagpage/' + props.link,
          state: { tagState: props.link}
        }}>
          {props.tagName}
        </Link>
        <div className="stats">
          <div className="calls">
            Number of Calls: {props.numCalls}
          </div>
          <div className="people">
            Number of People: {props.numPeople}
          </div>
        </div>
      </div>
    )
  }

  export default TagList
