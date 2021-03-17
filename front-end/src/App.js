import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import About from './About'


function MainPage(prop){                 //need  user name
  return (
    <div>
      <Toplog> </Toplog>
      <h1 align = "left"> {prop.name} </h1>
      <Link ali = "left" var = "primary" action = "/tagPage" name = "Explore Tags"> </Link>
      <Link ali = "left" var = "primary" action = "/createCallPage" name = "Start Call"> </Link>
      <Link ali = "left" var = "primary" action = "/recentCalls" name = "Recent Calls"> </Link>
      <Textbox ali = "center" mess = "Enter Call Name: " tag = "tag" name = "Join Call"> </Textbox>
      <Link ali = "center" var = "primary" action = "/chatRoom" name = "I am feeling lucky!"> </Link>
      <Bottom> </Bottom>
    </div>
  );
}
//<div className="App">
//      <MainPage></MainPage>
//    </div>

function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route path="/">
            <MainPage />
          </Route>
          <Route path="/about" component={About} />
        </Switch>
      </Router>
    </div>
  );
}

function Toplog(prop) {
  return (
    <div id = "top">
      <div id = "nickname">
        <Textbox mess = "Nickname: " tag = "nickname" name = "confirm"> </Textbox>
      </div>
      <button position = "absolute" bottom = "0"  href = "/easterEggPage" id = "topper"> SpeakEasy </button>
    </div>
  );
}

function Link(prop) {
  return (
    <div align = {prop.ali}>
      <button variant = {prop.var} href = {prop.action} className = "buttons" id = {prop.id}>  {prop.name}
      </button>
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
      <Link ali = "center" var = "primary" action = "/about" name = "About us" id = 'au'> </Link>
      <h2> All right reserved 2021 </h2>
    </div>
  );
}

export default App;
