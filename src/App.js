import './App.css';
import { useEffect, useState} from 'react'
import NavBar from './Components/NavBar';
import { Routes, Route} from "react-router-dom";
import { Navigate } from 'react-router-dom';
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import TodoApp from './Components/TodoApp'

function App() {
  const [isLoggedin,setIsLoggedin] = useState(false);
  const [loggedInUser,setLoggedInUser] = useState({firstname:"",todos :[],lastname:"",email:"",password:"",id:""})
  return (
    <div className="App">
      <NavBar isLoggedin = {isLoggedin}  loggedInUser = {loggedInUser} setIsLoggedin = {setIsLoggedin}/>
      <div className="outer">
        <div className="inner">
        <Routes>
        <Route path = "/login" element = {<Login isLoggedin = {isLoggedin} loggedInUser = {loggedInUser} setLoggedInUser = {setLoggedInUser} setIsLoggedin = {setIsLoggedin} />}  /> 
        <Route path = "/signup" element = {<SignUp/>} />
        <Route path = "/todoapp"    element =   { isLoggedin ? <TodoApp setIsLoggedin = {setIsLoggedin} setLoggedInUser = {setLoggedInUser} loggedInUser = {loggedInUser} /> :  <Navigate to="/login" />  } />
        <Route path = "/" element =   { isLoggedin ? <Navigate to="/todoapp" /> :  <Navigate to="/login" />  } />
      </Routes>
        </div>
      </div>

    
    </div>
  );
}















export default App;
