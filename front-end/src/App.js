import './App.css';
import MainPage from './MainPage';
import About from './About';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Chatroom from './Chatroom';
import TagList from './TagList';
import TagPage from './TagPage';
import EasterEgg from './EasterEgg';
import Logo from './speakeasyLogo.PNG';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/easter">
          <EasterEgg/>
        </Route>
        <Route path="/taglist">
          <Toplog />
            <TagListWithTags />
          <Bottom />
        </Route>
        <Route path="/tag">
          <Toplog />
            <TagPageWithCalls />
          <Bottom />
        </Route>
        <Route path="/recent">
          <Toplog />
          NOT IMPLEMENTED YET
          <Bottom />
        </Route>
        <Route path="/createcall">
          <Toplog />
          NOT IMPLEMENTED YET
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
        <Route path="/">
          <Toplog />
          <MainPage />
          <Bottom />
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


export const Toplog = (props) => {
  return (
    <div id = "top">
      <div id = "nickname">
        <Textbox mess = "Nickname: " tag = "nickname" name = "confirm"> </Textbox>

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
     <form action="/callPage">
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
      'tagName': 'TAG NAME 1',
      'link': 'tag',
      'numPeople': 123,
      'numCalls': 456
    },
    {
      'tagName': 'TAG NAME 2',
      'link': 'tag',
      'numPeople': 987,
      'numCalls': 34
    },
    {
      'tagName': 'TAG NAME 3',
      'link': 'tag',
      'numPeople': 9867,
      'numCalls': 324
    },
    {
      'tagName': 'TAG NAME 4',
      'link': 'tag',
      'numPeople': 28,
      'numCalls': 35
    }
  ]
  return <TagList tags={tags} />
}

const TagPageWithCalls = () => {
  const calls = [
    {
      'callName': 'CALL NAME 1',
      'link': 'call1',
      'numPeople': 536,
      'duration': 9.1
    },
    {
      'callName': 'CALL NAME 2',
      'link': 'call2',
      'numPeople': 251,
      'duration': 548.2
    },
    {
      'callName': 'CALL NAME 3',
      'link': 'call3',
      'numPeople': 941,
      'duration': 32.7
    },
    {
      'callName': 'CALL NAME 4',
      'link': 'call4',
      'numPeople': 151,
      'duration': 43.2
    }
  ]
  return <TagPage calls={calls} />
}


export default App;
export {Linker , Textbox};
