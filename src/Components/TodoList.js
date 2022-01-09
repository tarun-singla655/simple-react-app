import React from 'react';
import Todo from './Todo'
const TodoList = ({todos,setTodos,status,replaceTextHandler,setChangeId,FetchTodos,loggedInUser,setLoggedInUser})=>{

    const changeValueHandler = (value)=>{
           
                replaceTextHandler(value);
    }
    return (
        <>
        <div className="todo-container">
            <ul className="todo-list">
            {
               loggedInUser.todos.map((todo)=> {
                if ((status === 'completed' && todo.completed === true ) || (status === 'uncompleted' && todo.completed === false) || (status === 'all')  ) {
                      return (
                        <Todo loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} FetchTodos = {FetchTodos} changeValueHandler = {changeValueHandler} key = {todo.id} setTodos = {setTodos} text = {todo.text} todos = {todos} todo = {todo} />
                      );
                  }
        
                return <div key = {todo.id}></div>
               })
            }  
            </ul>
        </div>
        </>
    );
}


export default TodoList;