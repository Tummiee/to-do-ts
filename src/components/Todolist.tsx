import React, { useState } from 'react'
import { Todo } from '../components/model'
import "../components/style.css"
import SingleTodo from './SingleTodo';
import { Droppable } from 'react-beautiful-dnd';

interface Props{
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    autoExpandSection: 'active' | 'completed' | null;
    setAutoExpandSection: React.Dispatch<React.SetStateAction<'active' | 'completed' | null>>;
}

// Define the types for react-beautiful-dnd
interface DroppableProvided {
    innerRef: (element: HTMLElement | null) => void;
    droppableProps: React.HTMLAttributes<HTMLDivElement>;
    placeholder?: React.ReactElement | null;
}

const Todolist: React.FC<Props> = ({todos, setTodos, completedTodos, setCompletedTodos, autoExpandSection, setAutoExpandSection}: Props) => {
  const [focusedSection, setFocusedSection] = useState<'active' | 'completed'>('active');

  // Use autoExpandSection if available, otherwise use focusedSection
  const currentExpandedSection = autoExpandSection || focusedSection;

  const handleSectionClick = (section: 'active' | 'completed') => {
    // Clear auto-expand when user manually clicks
    setAutoExpandSection(null);
    
    if (focusedSection === section) {
      setFocusedSection('active'); // Reset to active tasks instead of null
    } else {
      setFocusedSection(section);
    }
  };

  // Clear auto-expand after a short delay to allow user to see the effect
  React.useEffect(() => {
    if (autoExpandSection) {
      const timer = setTimeout(() => {
        setAutoExpandSection(null);
      }, 2000); // Clear after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [autoExpandSection, setAutoExpandSection]);

  return (
    <div className="container">
      <Droppable droppableId='TodosList'>
        {
          (provided: DroppableProvided) => (
        <div 
          className={`todos ${currentExpandedSection === 'active' ? 'todos--expanded' : 'todos--contracted'} ${autoExpandSection === 'active' ? 'auto-expand' : ''}`}
          ref={provided.innerRef} 
          {...provided.droppableProps}
          onClick={() => handleSectionClick('active')}
        >
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
            <div 
              className={`todos remove ${currentExpandedSection === 'completed' ? 'todos--expanded' : 'todos--contracted'} ${autoExpandSection === 'completed' ? 'auto-expand' : ''}`}
              ref={provided.innerRef} 
              {...provided.droppableProps}
              onClick={() => handleSectionClick('completed')}
            >
            <span className="todos__heading" style={{color: "white"}}>
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