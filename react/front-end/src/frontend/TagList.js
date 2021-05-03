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
        <div className="grayButtontag">
          No Tags with On Going Calls!
        </div>
        <img className="no-calls-image" alt="" src={NoCallsImage} />
        <div className="grayButtontag">
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
          <div className="grayButtontag">
            {numberOfDistinctTags + " Distinct Tags!"}
          </div>
          <div className="tagList">
            {distinctTagsList.map(callTag => {
              return (
                <Tag tagName={callTag[0]} 
                  key={callTag[0]}
                  link={callTag[0]}
                  numCalls={callTag[1]} 
                  numPeople='X' />
              )
            })}
          </div>
          <div className="grayButtontag">
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
        <Link className="linktag"
        to={{
          pathname:'/tagpage/' + props.link,
          state: {tagState: props.link}
        }}>
          <p className="paragraphtag">
            {props.tagName}
          </p>
        </Link>
        <div className="callstag">
          <p className="paragraphtag">
            Num. Calls: {props.numCalls}
          </p>
        </div>
      </div>
    )
  }

  export default TagList
