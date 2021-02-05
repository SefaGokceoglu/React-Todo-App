import React,{useState} from 'react';
import {DragDropContext,Droppable} from 'react-beautiful-dnd';
import './DropOff.css';
import SearchBox from '../SearchBox/SearchBox'
import Form from '../Form/Form';
import DropContext from '../Droppable/DropContext'
import fire from '../Firebase/Firebase'

function DragNDrop({SetHasAccount}){


    const [Mylist, SetMylist]=useState([])

    const columns ={
        "Todo":{
            name:"To Do's",
            items : Mylist
        },
        "Ip":{
            name:"In Progress",
            items:[]
        },
        "Comp":{
            name:"Completed",
            items:[]
        }
    }

    const [Todos,UseTodos]=useState(columns)

    const onSearchChange = (e) =>{
        const ip =[...Todos.Ip.items]
        const comp =[...Todos.Comp.items] 
        if(e.target.value.trim() !== ""){ 
        const filter = Todos.Todo.items.filter( value =>{
            if(value.content.toLowerCase().includes(e.target.value.toLowerCase()))
            return value
        })
        UseTodos(
            {
                "Todo":{
                    name:"To Do's",
                    items : filter
                },
                "Ip":{
                    name:"In Progress",
                    items:ip
                },
                "Comp":{
                    name:"Completed",
                    items:comp
                }
            }
        
        )
        }
        else{

            const array = ip.concat(comp)
            const filter = Mylist.filter( value =>{
                if(!array.includes(value)){
                    return value
                }
            })
            UseTodos({
                    "Todo":{
                        name:"To Do's",
                        items : filter
                    },
                    "Ip":{
                        name:"In Progress",
                        items: ip
                    },
                    "Comp":{
                        name:"Completed",
                        items: comp
                    }
                }
            )    
        }

        
        
    }



    const onDragEnd = (result,Todos,UseTodos) =>{
        if(!result.destination) return;
        const {source , destination}=result;
        if(source.droppableId !== destination.droppableId){
            const sourceColumn =Todos[source.droppableId];
            const destColumn = Todos[destination.droppableId];
            const sourceitems =[...sourceColumn.items];
            const destitems =[...destColumn.items];
            const [removed] = sourceitems.splice(source.index,1);
            destitems.splice(destination.index,0,removed)
            UseTodos({
                ...Todos,
                [source.droppableId]:{
                    ...sourceColumn,
                    items:sourceitems
                },
                [destination.droppableId]:{
                    ...destColumn,
                    items:destitems
                }
            }); 
            }
        else{
        const column = Todos[source.droppableId]
        const Arr = [...column.items];
        const [removed]=Arr.splice(source.index,1);
        Arr.splice(destination.index,0,removed);
    
        UseTodos({
            ...Todos,
            [source.droppableId]:{
                ...column,
                items:Arr
            }
        });
        }
      }

    const handleSignOut = (e) =>{
        e.preventDefault()
        SetHasAccount(true)
        fire.auth().signOut()

    }
      
    return(
        <div>
        <button className ="Signout" onClick={handleSignOut} >Sign Out</button>
        <h1>My Plan For Today </h1>
        <Form UseTodos={UseTodos} Mylist={Mylist} SetMylist={SetMylist}/>
        <DragDropContext onDragEnd={result=>onDragEnd(result,Todos,UseTodos)}>
        <div  className="grid-container">
        {Object.entries(Todos).map(([id,column])=>{
            return(
            <div key ={id}>
            <h3 className="header">{column.name}</h3>
            <Droppable droppableId= {id} key={id}>
                {(provided,snapshot)=>{
                    return(
                        <DropContext column={column} provided={provided} snapshot={snapshot}   />
                    )
                }}
            </Droppable>
            </div>

            
            )
        })}    
        </div>   
        </DragDropContext>
        <SearchBox searchChange={onSearchChange} />
        </div>


    )


}


export default DragNDrop;