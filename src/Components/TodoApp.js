import React from 'react'

import {useState,useEffect} from 'react';
import Form from './Form';
import TodoList from './TodoList';
// setLoggedInUser({firstname : "",lastname:"",email:"",password:"",id:"",todos:[]}); 
export default function TodoApp({setLoggedInUser,loggedInUser,setIsLoggedin}) {
    const [inputText,setInputText] = useState("");
    const {firstname,lastname} = loggedInUser;
  const [todos,setTodos] = useState([]);
  const [status,setStatus] = useState("all");
  const [changeId,setChangeId] = useState(new Date());

  const FetchTodos = ()=>{
  
  } 
  useEffect(() => {
    FetchTodos()
  })

  const replaceTextHandler = (value)=>{
        setChangeId(value.key);
        setInputText(value.text)
    
  }
    return (
        <div>
          <header className = "header">
            Hello, {firstname} , {lastname} Welcome to TodoApp
          </header>
        <Form  loggedInUser={loggedInUser} setLoggedInUser = {setLoggedInUser} FetchTodos = {FetchTodos} status = {status} changeId = {changeId} setChangeId = {setChangeId}  todos = {todos} inputText = {inputText} setTodos = {setTodos} setInputText = {setInputText} setStatus = {setStatus} />
        <TodoList loggedInUser = {loggedInUser} setLoggedInUser={setLoggedInUser} FetchTodos = {FetchTodos} setChangeId = {setChangeId} replaceTextHandler = {replaceTextHandler} status = {status} setTodos = {setTodos} todos = {todos} />
        </div>
    )
}
