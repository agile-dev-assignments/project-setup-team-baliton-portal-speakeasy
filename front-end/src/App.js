import './App.css';
import MainPage from './MainPage';
import About from './About';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Chatroom from './Chatroom';
import TagList from './TagList';
import TagPage from './TagPage';
import RecentCallsPage from './RecentCallsPage';
import EasterEgg from './EasterEgg';
import Logo from './speakeasyLogo.PNG';
import CreateNewCallPage from './CreateNewCall';
//import CreateNewCall from './CreateNewCall'
import React, { useState, useRef } from 'react';
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
          <Toplog />
          <Chatroom/>
          <Bottom />
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
         <button variant = {prop.var} className = "buttons" id = {prop.id}>  {prop.name}
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
        <button className="buttons" onClick={handleNick}>
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
    <div align = {prop.ali}>
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
      <Linker ali = "center" var = "primary" action = "/about" name = "About us" id = 'au'> </Linker>
      <h2> All right reserved 2021 </h2>
    </div>
  );
}

const TagListWithTags = () => {
  const tags = [
    {
      'tagName': 'Red',
      'link': 'Red',
      'numPeople': 123,
      'numCalls': 456
    },
    {
      'tagName': 'Blue',
      'link': 'Blue',
      'numPeople': 987,
      'numCalls': 34
    },
    {
      'tagName': 'Yellow',
      'link': 'Yellow',
      'numPeople': 9867,
      'numCalls': 324
    },
    {
      'tagName': 'Green',
      'link': 'Green',
      'numPeople': 28,
      'numCalls': 35
    }
  ]
  return <TagList tags={tags} />
}

export default App;
export {Linker , Textbox, Toplog, Bottom, dotenv};
