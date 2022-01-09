import React,{useRef} from 'react';
const Todo = ({setTodos,text,todos,todo,changeValueHandler,loggedInUser,setLoggedInUser})=>{
    const inputRef = useRef(null);
    const selectValueHandler = ()=>{
        changeValueHandler({text:inputRef.current.outerText,key:todo.id});
    }
    const UpdateByCompletion = (item) => {
        item.completed = !item.completed;
        fetch(`http://localhost:8080/todo`,
        {  method: "PUT",
        headers: {    "Content-type": "application/json"  }, 
        body: JSON.stringify(item)}) 
        .then(response => {    console.log(response.status) }) 
    }
    const deletApi = ()=>{
        const url = `http://localhost:8080/todo/${loggedInUser.id}`;
    
        fetch(url, 
            {  method: "DELETE",
            headers: {    "Content-type": "application/json"  }, 
            body: JSON.stringify(todo)}) 
            .then((response)=> {
              if (response.ok) {
                console.log("deleted");
                setLoggedInUser({...loggedInUser,todos:loggedInUser.todos.filter((el)=> el.id !== todo.id )})
              }
               else{
                   throw response;
               }
            })
        
    }
    const deleteHandler = ()=>{
         deletApi();
         setTodos(todos.filter((el)=> el.id !== todo.id ));
    }
    const completeHandler = () =>{
        let myitem;
        setTodos(todos.map((item)=>{
            if(item.id === todo.id){
               myitem = item;
                return {...item, completed : !item.completed}
            }
            else{
                return item;
            }
        }))
        UpdateByCompletion(myitem);
    }
    return (
        <>
        <div className = "todo">
            <li onClick={selectValueHandler} ref={inputRef} className={`todo-item ${todo.completed ? "completed" : "" }`}>{text}</li>
            <button onClick = {completeHandler} className='complete-btn'><i className="fas fa-check"></i></button>
            <button onClick={deleteHandler} className='trash-btn'><i className="fas fa-trash"></i></button>
        </div>
       </>
    )
};
export default Todo