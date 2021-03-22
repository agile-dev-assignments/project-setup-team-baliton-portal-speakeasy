import './App.css';
import {Linker, Textbox} from './App.js';


const MainPage = (prop) => {                 //need  user name
  return (
    <div>
      <h1 align = "left"> {prop.name} </h1>
      <Linker ali = "left" var = "primary" action = "/taglist" name = "Explore Tags"> </Linker>
      <Linker ali = "left" var = "primary" action = "/createcall" name = "Start Call"> </Linker>
      <Linker ali = "left" var = "primary" action = "/recent" name = "Recent Calls"> </Linker>
      <Textbox ali = "center" mess = "Enter Call Name: " action = "/chatroom" tag = "title" name = "Join Call"> </Textbox>
      <Linker ali = "center" var = "primary" action = "/chatroom" name = "I am feeling lucky!"> </Linker>
    </div>
  );
}

export default MainPage;
