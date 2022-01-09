
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';


import './Login.css'


export default function Login({isLoggedin,setIsLoggedin,setLoggedInUser}) {
  let navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useState({ email :"", password: "" })
    const [loginError,setLoginError] = useState({email : "", password : ""})
    const [loginStatus,setLoginStatus] = useState(false);
    const [error,seterror] = useState('');
    const validEmailRegex = RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );
    const validateForm = errors => {
  
      let valid = true;
      if(loginInfo.email.length === 0 && loginInfo.password.length === 0 )
      {
        valid = false;
      }
      Object.values(errors).forEach(val => val.length > 0 && (valid = false));
      setLoginStatus(valid);
      return valid;
    };
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log("submit");
      const user = loginInfo

      fetch(`http://localhost:8080/user/login`,
      {  method: "POST",
      headers: {    "Content-type": "application/json"  }, 
      body: JSON.stringify(user)}) 
      .then((response)=> {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((jsonArr) => {
            setLoggedInUser(jsonArr);
            setIsLoggedin(true);
            navigate('/todoapp');
        })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
        
    }
    const handleChange = (event)=>{
      event.preventDefault();
      let errors = loginError
      const { name, value } = event.target;
      switch(name){
        case "email":
          errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
            setLoginInfo({email:value,password:loginInfo.password});
        break;
        case "password":
          errors.password = 
              value.length < 8
                ? 'Password must be at least 8 characters long!'
                : '';
              loginInfo.password = value
              setLoginInfo({email:loginInfo.email,password:value});
            break;
        default:
          break; 
      }
      setLoginStatus(validateForm(errors))
      setLoginError(errors);
    }
    return (
        <div className="main" style={{height:'340px'}}>
        <p className="sign" align="center">Login</p>
        <form className="form" onSubmit={handleSubmit} noValidate>
          <input className ="un " type="text" name='email' align="center" placeholder="email" onChange={handleChange}/>
          {loginError.email.length > 0 ?
                <span className='error'style={{paddingLeft:"160px"}} >{loginError.email}</span> : <span></span> }    
          <input className="pass"  name = "password" type="password" align="center" placeholder="Password"  onChange={handleChange}/>
          {loginError.password.length > 0 ?
                <div className='error' style={{paddingLeft:"100px"}} >{loginError.password}</div> : <span></span> }
          <button className="submit" disabled = {loginStatus===false} align="center">Sign in</button>
         {error.length>0 ? <div style ={{paddingLeft:'100px'} } className='error'>{error}</div> : <div></div> }
          </form>
        </div>
         
    )
}



