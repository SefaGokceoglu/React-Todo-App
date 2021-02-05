import React,{useState} from 'react'

import './Form.css'
import {v4 as uuidv4} from 'uuid';




function Form ({UseTodos,Mylist,SetMylist}){

    const [text, setText]=useState("")

    
    const onChangeHandler = (e) =>{
        setText(e.target.value)
    }


    const onClickHandler = (e) =>{
        e.preventDefault();
        if(text !==''){
        const inputvalue={ id:uuidv4() , content: text}

        const cpy = [...Mylist,inputvalue]

        SetMylist(cpy)


        UseTodos(prev=>{
            return{
                ...prev,
                "Todo":{
                    name:"To Do's",
                    items:[...prev.Todo.items, inputvalue]
                }
            }
        })
        
        setText("")
        }
        }
    


    return(
        <form >
        <input type="text" value={text} placeholder="Enter a Todo" onChange={onChangeHandler}/>
        <button onClick={onClickHandler}><i className="fas fa-plus-square fa-4x"></i></button>
        </form>

    )
}

export default Form;