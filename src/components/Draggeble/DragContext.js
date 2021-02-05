import React from 'react'


function DragContext ({provided,item}) {
        return(
            <div className ="Card" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>              
               <p className='ID'>{item.content}</p>               
            </div>
        )
   }


export default DragContext;