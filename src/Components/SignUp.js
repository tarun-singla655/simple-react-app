import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
export default function SignUp() {
  const [signupInfo,setSignupInfo]   = useState({firstname:"",lastname:"",email:"",password:""})
  const [signupError,setSignupError] = useState({firstname:"",lastname:"",email:"",password:""})
  const [validStatus,setValidStatus] = useState(false);
  let navigate = useNavigate();
  const validEmailRegex = new RegExp(
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
  const validNameRegex = new RegExp(
    /^[a-z]+$/i
  );
  
  const validateForm = errors => {

    let valid = true;
    Object.values(signupInfo).forEach(val=>{
      if(val.length===0){
        valid = false;
      }
    })
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    setValidStatus(valid);
    return valid;
  };
  const handleSubmit = (event) => {
    event.preventDefault()
    const user = signupInfo;
    console.log(user);
    fetch(`http://localhost:8080/user/signup`,
    {  method: "POST",
    headers: {    "Content-type": "application/json"  }, 
    body: JSON.stringify(user)}) 
    .then(response => {    
       if(response.ok){
         return response.json();
       }
       throw response;
     })  .then((jsonArr) => {
       console.log("User Created");
       navigate('/login');
  })
   }
  const handleChange = (event)=>{
    event.preventDefault();
    let errors = signupError
    const { name, value } = event.target;
    switch(name){
      case "email":
        errors.email = 
        validEmailRegex.test(value)
          ? ''
          : 'Email is not valid!';
          setSignupInfo({...signupInfo,email:value});
          setSignupError({...signupError,email:errors.email})
      break;
      case "password":
        errors.password = 
            value.length < 8
              ? 'Password must be at least 8 characters long!'
              : '';
            setSignupInfo({...signupInfo,password:value});
            setSignupError({...signupError,password:errors.password})
          break;
      case 'firstname':
        errors.firstname = validNameRegex.test(value)
        ? '' 
        : 'firstname is not valid';
        setSignupInfo({...signupInfo,firstname:value});
        setSignupError({...signupError,firstname:errors.firstname})
        break;
      case 'lastname':
        errors.lastname = validNameRegex.test(value)
        ? '' 
        : 'lastname is not valid';
        setSignupInfo({...signupInfo,lastname:value});
        setSignupError({...signupError,lastname:errors.lastname})
        break;
      default:
        break; 
    }
 
    setValidStatus(validateForm(signupError))
    // setSignupError(errors);
  }
    return (
        <div>
           <div className="main" style={{height:'540px'}}>
        <p className="sign" align="center">Sign Up</p>
        <form className="form" onSubmit={handleSubmit}>
          <input  onChange = {handleChange} className ="un " name = "firstname" type="text" align="center" placeholder="First Name"/>  
          {signupError.firstname.length>0 ? <div  style={{paddingLeft:"160px"}} className="error">{signupError.firstname}</div> : <div></div>  }
          <input  onChange = {handleChange} className ="un " name = "lastname" type="text" align="center" placeholder="Last Name"/>
          {signupError.lastname.length>0 ? <div  style={{paddingLeft:"160px"}} className="error">{signupError.lastname}</div> : <div></div>  }
          <input  onChange = {handleChange} className ="un " name = "email" typpe = "text" align="center" placeholder="Email"/>
          {signupError.email.length>0 ? <div style={{paddingLeft:"150px"}} className="error">{signupError.email}</div> : <div></div>  }
          <input  onChange = {handleChange} className ="pass" name = "password" type="password" align="center" placeholder="Password"/>
          {signupError.password.length>0 ? <div style={{paddingLeft:"120px"}} className="error">{signupError.password}</div> : <div></div>  }
   
          <button className="submit"  disabled={validStatus===false} align="center">Sign Up</button>
        
          </form>
        </div>
        </div>
    )
}
