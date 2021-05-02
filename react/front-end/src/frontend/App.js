import './App.css';
import MainPage from './MainPage';
import About from './About';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Chatroom from './Chatroom';
import TagList from './TagList';
import TagPage from './TagPage';
import RecentCallsPage from './RecentCallsPage';
import EasterEgg from './EasterEgg';
//import Logo from './images/speakeasyLogo.PNG';
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
            <TagList />
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
        <Route path="/chatroom" component={Backend} />
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

const LinkHeader = () => {
  return (
    <div>
      <a className="linka" href='/main'>
         <h1 id="logotext">Speakeasy</h1>
      </a>
    </div>
  );
}


const Toplog = () => {
  return (
    <div id = "top">
      <a className="linka" href='/main'>
         <h1 id="logotext">Speakeasy</h1>
      </a>
    </div>
  );
}

function Textbox(prop) {
  return (
    <div align = {prop.ali} className={prop.cn}>
      <form action="/chatroom">
        <label form="tag"><b>{prop.mess}</b></label>
        <input type="text" id={prop.tag} name={prop.tag} required={true}/><br/><br/>
        <input type="submit" value={prop.name} id="submitcall"/>
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

export default App;
export {Linker , Textbox, Toplog, Bottom, LinkHeader, dotenv};
