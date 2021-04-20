import React from 'react'
import './Chatroom.css'
import {Linker} from './App.js';


const Chatroom = () => {

    let speakersArray = [
        {
          "name": "Daniel",
        },
        {
          "name": "Oli Chen",
        },
        {
          "name": "Sharri Glloxhani",
        },
        {
          "name": "Ziyan Lin",
        },
        {
          "name": "Kirill Dolgin",
        },
      ]

      let listenersArray = [
        {
          "name": "Elon",
        },
        {
          "name": "Bill Gates",
        },
        {
          "name": "Venus Williams",
        },
        {
          "name": "Obama",
        },
        {
          "name": "Einstein",
        },
      ]


    return (
        <div class="chatroom">
            <h1>Welcome to *insertChatroomName</h1>
            <div id="moderatorContainer">
                <div id="leftCon">
                    <p>Moderator</p>
                    <p>CALL TAG(link)</p>
                </div>
                <div id="rightCon">
                    <p>Call Duration: XX</p>
                    <p>Number people: X</p>
                </div>
            </div>
            <div class="speakersPool">
                <UserList profiles={speakersArray} />
            </div>

            <button>Join Speakers</button>

            <div class="listenersPool">
                <UserList profiles={listenersArray} />
            </div>
            <div id="buttonContainer">
                <button id="muffleButton">Muffle Voice</button>
                <Linker id="endButton" var = "primary" action = "/main" name = "Leave/End Call"> </Linker>
            </div>
        </div>
    )
}


const UserList = (props) => {
    const profiles = props.profiles
    const userList = profiles.map((profile) => 
    <ul >
      <li key={profile.name}>
        <div className="profile-container">
          <a className="profile-entry">
            {profile.name}
          </a>
          {/*}
          <ul>
            <li>
              <a href={profile.github}>{profile.name}'s github account.</a>
            </li>
            <li>
              <a href={profile.email}>{profile.name}'s email link.</a>
            </li>
          </ul>
*/}
        </div>
      </li>
    </ul>
    )
    return (
      <div class="chatroom">
        <ul className="user-list">
          {userList}
        </ul>
      </div>
    )
  }

  export default Chatroom