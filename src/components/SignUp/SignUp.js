import React, { useState } from 'react'
import "./SignUp.css"
import fire from '../Firebase/Firebase'

function SignUpSection({SetHasAccount}){
    const [Email,SetEmail]=useState("")
    const [Password,SetPassword]=useState("")
    const [VPassword,SetVPassword]=useState("")
    const [error,SetError]=useState("")



    const onClickHandler = (e)=>{
        e.preventDefault()

        SetHasAccount(true)
    }



    
    const handleSignUp = () =>{
        SetError("")
        if (Password !== VPassword){
            SetError("Passwords don't match!")
        }
        else{
            fire
            .auth()
            .createUserWithEmailAndPassword(Email,Password)
            .catch(err =>{
                SetError(err.message)
            })
        if(error !=="")  {
            SetHasAccount(true)
        }     
        }
    }


    return(
    <div   className="login-form" >  
        <h1> Make Your Plan For Today </h1>
        <div className="login-container">
            <h3> SIGN UP</h3>
            <div className="input">
            <h5>Email</h5>
            <input type="text"   placeholder="example@gmail.com" onChange={ (e)=> SetEmail(e.target.value)}/>
            </div>
            <div className="input">
            <h5>Password</h5>
            <input type="password"   placeholder="Password" onChange={ (e)=> SetPassword(e.target.value)}/>
            </div>
            <div className="input">
            <h5> Verify Password</h5>
            <input type="password"   placeholder="Password" onChange={ (e)=>SetVPassword(e.target.value)}/>
            </div>
            <p className="error-message">{error}</p>
            <button className="login-btn" onClick ={handleSignUp}> Register </button>
            <p> Already have  an Account ? <span onClick={onClickHandler}>Sıgn In</span></p>
        </div>
    </div>      
    )
}


export default SignUpSection;