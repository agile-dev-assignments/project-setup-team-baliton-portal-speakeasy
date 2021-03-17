import './App.css';
import {Link, Textbox} from './App.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


const MainPage = (prop) => {                 //need  user name
  return (
    <div>
      <h1 align = "left"> {prop.name} </h1>
      <Link ali = "left" var = "primary" action = "/tagPage" name = "Explore Tags"> </Link>
      <Link ali = "left" var = "primary" action = "/createCallPage" name = "Start Call"> </Link>
      <Link ali = "left" var = "primary" action = "/recentCalls" name = "Recent Calls"> </Link>
      <Textbox ali = "center" mess = "Enter Call Name: " tag = "tag" name = "Join Call"> </Textbox>
      <Link ali = "center" var = "primary" action = "/chatRoom" name = "I am feeling lucky!"> </Link>
    </div>
  );
}

export default MainPage;
