import React from 'react';
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
        "name": "Books";
      },
      {
        "name": "Pandemic";
      },
      {
        "name": "Money";
      },
      {
        "name": "Investing";
      },
    ]
  return (
        <div class="createNewCall">
            <h1 align="center" id="header">Create New Call</h1>
            <Textbox ali = "center" mess = "Enter Call Name: " tag = "tag"> </Textbox>

            <input type="radio" id="popularTag" name="choice" value="popular_tag">
            <label for="popular_tag">Choose a Popular Tag:</label><br>

            <div className="popular-tags">
              <PopularTagsList tags={popularTagsList} />
            </div>

            <input type="radio" id="newTag" name="choice" value="new_tag">
            <label for="new_tag">Enter New Tag:</label>
            <Textbox ali = "center" tag = "tag"> </Textbox>

            <div id="buttonCreateContainer">
              <button id="createCallButton">Create Call!</button>
            </div>
        </div>
    )
}


const TagsList = (props) => {
  const tags = props.tags
  const popularTagsList = tags.map((tag) =>
    <li key={tag.name}>
      <div className="tag-details">
        <input type="radio" id={tag.name} name="choice" value={tag.name}>
        <label for={tag.name}>{tag.name}</label>
      </div>
    </li>
  )
  return (
    <ul className="tags-list">
      {popularTagsList}
    </ul>
  )
}

export default CreateNewCall;
