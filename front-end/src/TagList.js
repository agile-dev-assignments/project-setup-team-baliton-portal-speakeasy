import React from 'react'
import './TagList.css'
import { Link } from 'react-router-dom';


const TagList = (props) => {
    const tags = props.tags.map(tag =>
      <Tag tagName={tag.tagName} link={tag.link}
           numCalls={tag.numCalls} numPeople={tag.numPeople} />
    )
    
    return (
        <div className="page">
          <div className="grayButton">
            MOST POPULAR TAGS:
          </div>
          <div className="tagList">
            {tags}
          </div>
          <div className="grayButton">
            <a href="/taglist">
              LOAD MORE TAGS
            </a>
          </div>
        </div>
    )
}


const Tag = (props) => {
    return (
      <div className="tag">
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
