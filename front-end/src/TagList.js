import React from 'react'
import './TagList.css'


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
            <a href="">
              LOAD MORE TAGS
            </a>
          </div>
        </div>
    )
}


const Tag = (props) => {
    return (
      <div className="tag">
        <a className="link" href={props.link}>
          {props.tagName}
        </a>
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
