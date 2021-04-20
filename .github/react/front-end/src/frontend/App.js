import './App.css';
import MainPage from './MainPage';
import About from './About';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Chatroom from './Chatroom';
import TagList from './TagList';
import TagPage from './TagPage';
import RecentCallsPage from './RecentCallsPage';
import EasterEgg from './EasterEgg';
import Logo from './images/speakeasyLogo.PNG';
import CreateNewCallPage from './CreateNewCall';
//import CreateNewCall from './CreateNewCall'
import React, { useState, useRef } from 'react';
import Backend from '../App';
const dotenv = require("dotenv").config();

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/taglist">
          <Toplog />
            <TagListWithTags />
          <Bottom />
        </Route>
        <Route path="/tagpage/:tag" component={TagPage}/>
        <Route path="/recent">
          <Toplog />
            <RecentCallsPage />
          <Bottom />
        </Route>
        <Route path="/createcall">
          <Toplog />
          <CreateNewCallPage />
          <Bottom />
        </Route>
        <Route path="/chatroom">
          <Backend/>
        </Route>
        <Route path="/about">
          <Toplog />
          <About />
        </Route>
        <Route path="/main">
          <Toplog />
          <MainPage />
          <Bottom />
        </Route>
        <Route path="/">
          <EasterEgg/>
        </Route>
      </Switch>
     </Router>
  );
}

function Linker(prop) {
  return (
    <div align = {prop.ali}>
      <Link to = {prop.action}>
         <button variant = {prop.var} className = {prop.cn} id = {prop.id}>  {prop.name}
         </button>
      </Link>
    </div>
  );
}


const Toplog = (props) => {
  const [nick, setNickname] = useState('')
  const nicknameRef = useRef()

  function handleNick(e) {
    const nn = nicknameRef.current.value
    setNickname(nn);
  }

  if (nick !== '') {
    <div id = "top">
      <div id = "nickname">
        <h2>
          {nick}
        </h2>
      </div>
      <Link to = "/main">
        <img className="logo" alt="" src={Logo} />
      </Link>
    </div>
  }
  return (
    <div id = "top">
      <div id = "nickname">
        <label><b>Nickname: </b></label>
        <input ref={nicknameRef} type="text" />
        <button id="nicknameButton" onClick={handleNick}>
          Submit
        </button>
      </div>
      <Link to = "/main">
        <img className="logo" alt="" src={Logo} />
      </Link>
    </div>
  );
}

function Textbox(prop) {
  return (
    <div align = {prop.ali} className={prop.cn}>
     <form action="/chatroom">
       <label form="tag"><b>{prop.mess}</b></label>
       <input type="text" id={prop.tag} name = {prop.tag}/><br/><br/>
       <input type="submit" value= {prop.name} id = "submitcall"/>
     </form>
    </div>
  );
}

function Bottom() {
  return (
    <div id = "bottom">
      <br></br>
      <Linker ali = "center" var = "primary" action = "/about" name = "About us" id = 'au' cn = "buttons"> </Linker>
      <h2 id="reserved"> All rights reserved 2021 </h2>
    </div>
  );
}

const TagListWithTags = () => {
  const tags = [
    {
      'tagName': 'tag1',
      'link': 'tag1',
      'numPeople': 0,
      'numCalls': 0
    },
    {
      'tagName': 'tag2',
      'link': 'tag2',
      'numPeople': 0,
      'numCalls': 0
    },
    {
      'tagName': 'tag3',
      'link': 'tag3',
      'numPeople': 0,
      'numCalls': 0
    },
    {
      'tagName': 'tag4',
      'link': 'tag4',
      'numPeople': 0,
      'numCalls': 0
    }
  ]
  return <TagList tags={tags} />
}

export default App;
export {Linker , Textbox, Toplog, Bottom, dotenv};
