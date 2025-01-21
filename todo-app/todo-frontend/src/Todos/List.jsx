import React from 'react'
import Todo from './Todo'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {

return(
    <div>
      {todos.map(todo => 
        <React.Fragment>
          <hr />
          <Todo todo={todo} onDelete={deleteTodo} onComplete={completeTodo} />
        </React.Fragment>
      )}
    </div>
  )
}

export default TodoList
