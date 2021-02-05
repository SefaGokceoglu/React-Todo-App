import React, { useEffect, useState } from 'react'
import "./Login.css"
import fire from '../Firebase/Firebase'

function LoginSection({SetLogin ,SetHasAccount}){
    const [Email,SetEmail]=useState("")
    const [Password,SetPassword]=useState("")
    const [error,SetError]=useState("")

    const emailChange = (e) =>{
        SetEmail(e.target.value)
    }
    const passwordChange = (e) =>{
        SetPassword(e.target.value)
    }



    const handleLogin = () =>{
        fire
        .auth()
        .signInWithEmailAndPassword(Email,Password)
        .catch(err =>{
            SetError(err.message);
            }
        )

        SetError("")
    }

    const onClickHandler = (e)=>{
        e.preventDefault()
        SetHasAccount(false)
    }

    const authListener = () =>{
        fire.auth().onAuthStateChanged(user =>{
          if (user){
            SetLogin(true)
          }
          else{
            SetLogin(false)
          }
        }) 
      }

      useEffect(()=>{
            authListener();
      })
      

    return(
    <div   className="login-form" >  
        <h1> Make Your Plan For Today </h1>
        <div className="login-container">
            <h3> SIGN IN</h3>
            <div className="input">
            <h5>Email</h5>
            <input type="email" autoFocus required  placeholder="example@gmail.com" onChange ={emailChange}/>
            </div>
            <div className="input">
            <h5>Password</h5>
            <input type="password"   placeholder="Password" onChange ={passwordChange}/>
            </div>
            <p className="error-message">{error}</p>
            <button className="login-btn" onClick ={handleLogin}> Log In </button>
            <p> Dont have an Account ?<span onClick={onClickHandler}> Sign Up </span> </p>
        </div>
    </div>      
    )
}


export default LoginSection;