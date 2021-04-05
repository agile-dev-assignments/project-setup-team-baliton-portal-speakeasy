import React, { useState, useEffect } from 'react';
import {Linker, Textbox} from './App.js';
import './App.css';
import './CreateNewCall.css';

const CreateNewCallPage {

  const [tagList, setTagList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/createNewCall')
      .then(response => response.json())
      .then(data => setTagList([...data]))
      .catch(error => {
        console.error('There was an error with /createNewCall !!', error);
      });
  }, []);

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
              {tagList.map(tag => {
                return (
                  <Tag key={tag.ID} onGoing={tag.active} tagName={tag.tagName}
                  link={"/chatroom/" + tag.ID} numPeople= {tag.numPeople} numCalls={tag.numCalls}/>
                )
              })}
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

const Tag = (props) => {
  return (
    <div className="tags-list">
    <ul  key={props.name}>
      <div className="tag-details">
        <input type="radio" id={props.key} name="choice" value={props.tagName}/>
        <label for={props.tagName}>{props.tagName}</label>
      </div>
    </ul>
    </div>
  )
}

export default CreateNewCallPage;
