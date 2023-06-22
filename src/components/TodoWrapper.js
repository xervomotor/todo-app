import React from 'react';
import { TodoForm } from './TodoForm';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';

export const TodoWrapper = ({ todos, addTodo, toggleComplete, deleteTodo, editTodo, editTask }) => {
  return (
    <div className='TodoWrapper'>
      <h1>Get Things Done!</h1>
      <TodoForm addTodo={addTodo} />

      {todos.map((todo, index) => (
        todo.isEditing ? (<EditTodoForm editTodo={editTask} task={todo}/>) : (
          <Todo task={todo} key={index} 
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          editTodo={editTodo} />
        )
      ))}

    </div>
  )
}
