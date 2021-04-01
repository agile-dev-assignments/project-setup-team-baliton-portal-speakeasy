import React from 'react';
import {Linker, Textbox} from './App.js';
import './App.css';
import './CreateNewCall.css';

const CreateNewCall = (prop) => {
  let popularTagsList = [
      {
        "name": "Soccer",
      },
      {
        "name": "Football",
      },
      {
        "name": "Bitcoin",
      },
      {
        "name": "Music",
      },
      {
        "name": "Movies",
      },
      {
        "name": "Books",
      },
      {
        "name": "Pandemic",
      },
      {
        "name": "Money",
      },
      {
        "name": "Investing",
      },
    ]
  return (
        <div class="createNewCall">

            <div id="header">Create New Call:</div>

            <div id="newCallName">
              <div id="callName">
                <div id="link">Enter Call Name: </div>
                <input type="text"/><br/><br/>
              </div>
            </div>

            <div id="newCallName">
              <div id="callName">
                <input type="radio" id="popularTag" name="choice" value="popular_tag"/>
                <label><b>Choose a Popular Tag:</b></label>
              </div>
            </div>

            <div id="newCallName">
              <div id="callName">
                <TagsList tags={popularTagsList} />
              </div>
            </div>

            <div id="newCallName">
              <div id="callName">
                <input type="radio" id="newTag" name="choice" value="new_tag"/>
                <label><b>Enter New Tag:</b></label>
                </div>
              </div>

              <Linker ali = "center" var = "primary" action = "/chatroom" name = "Create Call!"> </Linker>
        </div>
    )
}

const TagsList = (props) => {
  const tags = props.tags
  const popularTagsList = tags.map((tag) =>
    <ul key={tag.name}>
      <div className="tag-details">
        <input type="radio" id={tag.name} name="choice" value={tag.name}/>
        <label for={tag.name}>{tag.name}</label>
      </div>
    </ul>
  )
  return (
    <ul className="tags-list">
      {popularTagsList}
    </ul>
  )
}

export default CreateNewCall;
