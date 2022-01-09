import React from 'react'
import   Navbar  from 'react-bootstrap/Navbar'
import  Nav from 'react-bootstrap/Nav'
import {Link} from 'react-router-dom'
export default function NavBar({isLoggedin,setIsLoggedin,loggedInUser,setLoggedInUser}) {
    const LogOutHandler = () =>{
        setIsLoggedin(false);
        setLoggedInUser({firstname : "",lastname:"",email:"",password:"",id:"",todos:[]}); 
    }
    return (
        <div style = {{color:"white",marginLeft:'20px'}}>
             <Navbar  expand="lg" sticky="top">
                                {isLoggedin ?  <Navbar.Brand ><Link to = "/todoapp"  style={{color:'white', textDecoration:'none'}} >React Bootstrap Navbar</Link></Navbar.Brand> : <div><Navbar.Brand ><Link to = "/todoapp"  style={{color:'white', textDecoration:'none'}} ></Link></Navbar.Brand> </div>
                                 }
                               
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse style={{marginLeft:'1000px'}} id="basic-navbar-nav">
                                    <Nav className="mr-auto">
                                        <div style={{textDecoration:'none',paddingRight:'30px',color:'white'}}>
                                        {!isLoggedin ?   <Link style={{textDecoration:'none',color:'white'}}id="RouterNavLink" to="/signup">SignUp</Link> : <div>{loggedInUser.firstname}</div>}
                                        </div>
                                  
                           
                                    {isLoggedin ? <a href = "/" id="RouterNavLink"  onClick={LogOutHandler} style={{color:'white',textDecoration:'none'}} >LogOut</a> : 
                                    <Link id="RouterNavLink" style={{color:'white',textDecoration:'none'}} to="/login">LogIn</Link> }
                                    
                                    </Nav>
                                </Navbar.Collapse>
             </Navbar>
        </div>
    )
}

