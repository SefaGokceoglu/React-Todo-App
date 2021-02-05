import React from 'react'
import {Draggable} from 'react-beautiful-dnd'

import DragContext from '../Draggeble/DragContext'
function DropContext ({column,provided,snapshot}) {

    return(
        <div className="Drop"{...provided.droppableProps} ref={provided.innerRef} style={{minHeight:350 ,background: snapshot.isDraggingOver ?'lightblue':'lightgray'}}>
            {column.items.map((item,index)=>{
                return(
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided)=>{
                        return(
                            <DragContext provided={provided} item={item}/>
                        )
                    }}
                    </Draggable>
                    )
            })}
            {provided.placeholder}
        </div>



    )

}


export default DropContext;