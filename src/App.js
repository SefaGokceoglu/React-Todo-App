import React, {useState } from "react";
import './App.css';
import DragNDrop from './components/DnDSection/DropOff'
import LoginSection from './components/Login/Login'
import SignUpSection from './components/SignUp/SignUp'


function App() {
  const [Login, SetLogin]=useState(false);
  const [hasAccount,SetHasAccount]=useState(true)

  return (
    <div className="App">
    {Login  ? 
      <DragNDrop SetHasAccount={SetHasAccount} SetLogin={SetLogin}/>
    :
    hasAccount ?
      <LoginSection SetLogin ={SetLogin} SetHasAccount ={SetHasAccount}/>
    :  
      <SignUpSection SetHasAccount ={SetHasAccount}/>
    }  
    </div>
  );
}

export default App;
