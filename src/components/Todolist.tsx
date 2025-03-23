import React from 'react'
import { Todo } from '../components/model'
import "../components/style.css"
import SingleTodo from './SingleTodo';
import { Droppable } from 'react-beautiful-dnd';
import { JSX } from 'react/jsx-runtime';

interface Props{
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const Todolist: React.FC<Props> = ({todos, setTodos}: Props) => {
  return (
    <div className="container">
      <Droppable droppableId='TodosList'>
        {
          (provided: { innerRef: React.LegacyRef<HTMLDivElement> | undefined; droppableProps: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>; })=>(
            <div className="todos" ref={provided.innerRef} {...provided.droppableProps}>
        <span className="todos__heading">
          Active Tasks
        </span>
        
        {todos.map((todo) => (
          <SingleTodo 
          todo={todo} 
          key={todo.id} 
          todos={todos}
          setTodos={setTodos}
          />
        ))}
      </div>
          )
        }
      
      </Droppable>

      <div className="todos remove">
        <span className="todos__heading">
          Completed Tasks
        </span>
        {todos.map((todo) => (
          <SingleTodo 
          todo={todo} 
          key={todo.id} 
          todos={todos}
          setTodos={setTodos}
          />
        ))}
      </div>
    </div>
  )
}

export default Todolist;