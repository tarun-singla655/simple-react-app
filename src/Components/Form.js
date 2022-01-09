import React from 'react'




const Form = ({setInputText,setTodos,todos,inputText,setStatus,status,changeId,setChangeId,loggedInUser,setLoggedInUser})=>{
 
    const inputTextHandler = (e) => {
        setInputText(e.target.value);
    };
    const AddTodo = (mytodo) =>{
      // setLoggedInUser({firstname : "",lastname:"",email:"",password:"",id:"",todos:[]}); 
     fetch(`http://localhost:8080/user/todos/${loggedInUser.id}`,
      {  method: "POST",
      headers: {    "Content-type": "application/json"  },
      body: JSON.stringify(mytodo)}) 
      .then((response)=> {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((jsonArr) => {
            setLoggedInUser({...loggedInUser,todos:[...loggedInUser.todos,jsonArr]});
        })
      
        
    }
    const UpdateByText = (changeId) => {
      let mytodo;
      for(let i = 0;i<loggedInUser.todos.length;i++)
      {
        if(loggedInUser.todos[i].id === changeId)
        {
          mytodo = loggedInUser.todos[i];
        }
      }
      mytodo.text = inputText;
      fetch(`http://localhost:8080/todo/${loggedInUser.id}`,
      {  method: "PUT",
      headers: {    "Content-type": "application/json"  }, 
      body: JSON.stringify(mytodo)}) 
      .then((response)=> {
        if (response.ok) {
          setLoggedInUser(
            {...loggedInUser , todos: loggedInUser.todos.filter(el=>{
              if(el.id === mytodo.id){
                return {...el,text:inputText};
              }
              else{
                return el;
              }
            })  }
          )
          // return response.json();
        }
        else{
          throw response;
        }
        
      })
  
    }
    const submitTodoHandler = (e) =>{
          e.preventDefault();      
          let present = false;
          for(let i = 0;i<loggedInUser.todos.length;i++)
          {
            if(loggedInUser.todos[i].id === changeId)
            {
              present = true;  
              break;
            }
          }
          if(present)
          {
            UpdateByText(changeId,inputText);
 
            setChangeId(new Date());
          }
          else
          {
            AddTodo({text:inputText,completed:false});
          }
        setInputText("");
    }
    const statusHandler = (e)=>{
        setStatus(e.target.value);
    }
    const orderHandler = (e) =>{
      let stateSort = [...todos]
      if(e.target.value === 'text')
      {
        stateSort.sort((a,b) => (a.text > b.text) ? 1 : ((b.text > a.text) ? -1 : 0))
      }
      else if(e.target.value === 'date'){
        stateSort.sort((a,b) => (a.createdAt.getTime() < b.createdAt.getTime()) ? -1 : ((a.createdAt.getTime() > b.createdAt.getTime()) ? 1 : 0))
      }
      else{
        stateSort.sort((a,b) => (a.updatedAt.getTime() < b.updatedAt.getTime()) ? -1 : ((a.updatedAt.getTime() > b.updatedAt.getTime()) ? 1 : 0))
      }
      setTodos(stateSort)
 
    }
    return (
      <form className = "myform">
      <input value = {inputText} type="text" className="todo-input" onChange={inputTextHandler} />
      <button onClick = {submitTodoHandler} className="todo-button" type="submit">
        <i className="fas fa-plus-square"></i>
      </button>
      <div className="select">
        <select onChange = {statusHandler} name="todos" className="filter-todo">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
      <div className="select">
        <select  selected = "date" onChange = {orderHandler} name="sort" className="filter-todo">
        <option value="date">Recent</option>
        <option value="text">text</option>
        <option value="created">created</option>
          {/* {/* <option value="completed">Completed</option> */}
          
        </select>
      </div>
    </form>
    
    ); 
}


export default Form;