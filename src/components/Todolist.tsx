import React from 'react'
import { Todo } from '../components/model'
import "../components/style.css"
import SingleTodo from './SingleTodo';
import { Droppable } from 'react-beautiful-dnd';

interface Props{
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

// Define the types for react-beautiful-dnd
interface DroppableProvided {
    innerRef: (element: HTMLElement | null) => void;
    droppableProps: React.HTMLAttributes<HTMLDivElement>;
    placeholder?: React.ReactElement | null;
}

const Todolist: React.FC<Props> = ({todos, setTodos, completedTodos, setCompletedTodos}: Props) => {
  return (
    <div className="container">
      <Droppable droppableId='TodosList'>
        {
          (provided: DroppableProvided) => (
        <div className="todos" ref={provided.innerRef} {...provided.droppableProps}>
        <span className="todos__heading">
          Active Tasks
        </span>
        
        {todos.map((todo, index) => (
          <SingleTodo 
          index={index}
          todo={todo} 
          key={todo.id} 
          todos={todos}
          setTodos={setTodos}
          />
        ))}
        {provided.placeholder}
      </div>
          )
        }
      
      </Droppable>
      <Droppable droppableId= "TodosRemove">
        {(provided: DroppableProvided) => (
            <div className="todos remove" ref={provided.innerRef} {...provided.droppableProps}>
            <span className="todos__heading">
              Completed Tasks
            </span>
            {completedTodos.map((todo, index) => (
              <SingleTodo 
              index={index}
              todo={todo} 
              key={todo.id} 
              todos={completedTodos}
              setTodos={setCompletedTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
        
      </Droppable>
      
    </div>
  )
}

export default Todolist;