import './App.css';
import './MainPage.css';
import {Linker, Textbox} from './App.js';
import { useState } from 'react';
import { useHistory } from "react-router-dom";

const MainPage = (prop) => {
  //im feeling lucky logic:
  const history = useHistory();
  const [luckyMsg, setLuckyMsg] = useState("");
  //const [luckyRsp, setLuckyRsp] = useState({});
  const handleImFeelingLucky = () => {
    //get request to remove call from database
    let id = "";
    fetch('http://159.65.182.78:5000/imFeelingLucky')
    .then(response => response.json())
      .then(data => {
        id = data.callID;
        if (id === "noongoingcalls") {
          setLuckyMsg("No on-going calls to join, start one!")
        }
        else {
          let path = '/chatroom?id=' + id;
          history.push(path);
        }
    })
    .catch(error => {
      console.error('There was an error with /imFeelingLucky/ !!', error);
    });
  }

  return (
    <div id="mainDiv">
      <div id="side">
        <br></br>
        <h1 align = "left"> {prop.name} </h1>
        <Linker ali = "left" var = "primary" action = "/taglist" name = "Explore Tags" cn="bclass"> </Linker>
        <Linker ali = "left" var = "primary" action = "/recent" name = "Recent Calls" cn="bclass"> </Linker>
        <br></br>
      </div>
      <Textbox ali = "center" mess = "Call ID: " action = "/chatroom" tag = "id" name = "Join Call by Call ID" cn="callNameField"> </Textbox>
      <Linker ali = "center" var = "primary" action = "/chatroom?id=" name = "Create New Call" cn = "bclass"> </Linker>
      <div align="center">
        <button onClick={handleImFeelingLucky} variant="primary" className="bclass" >I am feeling lucky!</button>
      </div>
      <h4 className="luckymsg">{luckyMsg}</h4>
      <br></br>
      <br></br>
    </div>
  );
}

export default MainPage;
