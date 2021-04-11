import React, { useState, useEffect } from 'react';
import {Linker} from './App.js';
import './App.css';
import './CreateNewCall.css';

const CreateNewCallPage = (props) => {
  const tagList = [
      {
          "ID": 1,
          "tagName":"Economics",
          "numPeople": 170,
          "numCalls": 6,
          "callIDs":[ "00001", "00002", "00003", "00004", "00005", "00006" ],
          "active":"true"
      },
      {
          "ID": 2,
          "tagName":"Politics",
          "numPeople": 16,
          "numCalls": 2,
          "callIDs":[ "00007", "00008"],
          "active":"true"
      },
      {
          "ID": 3,
          "tagName":"Sports",
          "numPeople": 40,
          "numCalls": 3,
          "callIDs":[ "00009", "00010", "00011" ],
          "active":"true"
      },
      {
          "ID": 4,
          "tagName":"Health",
          "numPeople": 100,
          "numCalls": 5,
          "callIDs":[ "00012", "00013", "00014", "00015", "00016"],
          "active":"true"
      },
      {
          "ID": 5,
          "tagName":"Science",
          "numPeople": 70,
          "numCalls": 3,
          "callIDs":[ "00017", "00018", "00019"],
          "active":"true"
      },
      {
          "ID": 6,
          "tagName":"Movies",
          "numPeople": 10,
          "numCalls": 5,
          "callIDs":[ "00020", "00021", "00022", "00023", "00024"],
          "active":"true"
      },
  ];
  const [tagList2, setTagList] = useState([]);

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

            <div class="blockDisplay">
              <div id="callName">
                <label for="newCallName" id="nameLabel">Enter Call Name: </label>
                <input type="text" id="newCallName" name="newCallName"/>
              </div>
            </div>

            <div class="blockDisplay">
              <div id="popularTag">
                <input type="radio" id="popularTagRadio" name="choice" value="popular_tag"/>
                <label><b>Choose a Popular Tag:</b></label>
              </div>
            </div>

            <div class="blockDisplay">
              <div id="tagBlock">
              {tagList.map(tag => {
                return (
                    <Tag key={tag.ID} onGoing={tag.active} tagName={tag.tagName}
                    link={"/chatroom/" + tag.ID} numPeople= {tag.numPeople} numCalls={tag.numCalls}/>
                )
              })}
              </div>
            </div>

            <div class="blockDisplay">
              <div id="newTagName">
                <input type="radio" id="newTagRadio" name="choice" value="popular_tag"/>
                <label for="newCallName" id="nameLabel">Enter New Tag: </label>
                <input type="text" id="newTag" name="newTag"/>
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
        <input type="checkbox" id={props.key} name="choice" value={props.tagName}/>
        <label for={props.tagName}>{props.tagName}</label>
      </div>
    </ul>
    </div>
  )
}

export default CreateNewCallPage;
