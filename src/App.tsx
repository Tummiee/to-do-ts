import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import { Todo } from './components/model';
import Todolist from './components/Todolist';
import { DragDropContext } from 'react-beautiful-dnd'

// Define the DropResult type since the import isn't working
interface DropResult {
  draggableId: string;
  type: string;
  source: {
    droppableId: string;
    index: number;
  };
  destination: {
    droppableId: string;
    index: number;
  } | null;
  reason: 'DROP' | 'CANCEL';
}

const App: React.FC = () => {

  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, {id: Date.now(), todo, isDone: false}])
      setTodo("")
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // If dropped outside a droppable area
    if (!destination) return;

    // If dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Handle moving between lists
    if (source.droppableId === destination.droppableId) {
      // Moving within the same list
      if (source.droppableId === "TodosList") {
        const newTodos = [...todos];
        const [removed] = newTodos.splice(source.index, 1);
        newTodos.splice(destination.index, 0, removed);
        setTodos(newTodos);
      } else if (source.droppableId === "TodosRemove") {
        const newCompletedTodos = [...completedTodos];
        const [removed] = newCompletedTodos.splice(source.index, 1);
        newCompletedTodos.splice(destination.index, 0, removed);
        setCompletedTodos(newCompletedTodos);
      }
    } else {
      // Moving between different lists
      let sourceList: Todo[];
      let setSourceList: React.Dispatch<React.SetStateAction<Todo[]>>;
      
      if (source.droppableId === "TodosList") {
        sourceList = todos;
        setSourceList = setTodos;
      } else {
        sourceList = completedTodos;
        setSourceList = setCompletedTodos;
      }

      const [removed] = sourceList.splice(source.index, 1);

      if (destination.droppableId === "TodosList") {
        // Moving to active todos
        removed.isDone = false;
        const newTodos = [...todos];
        newTodos.splice(destination.index, 0, removed);
        setTodos(newTodos);
      } else if (destination.droppableId === "TodosRemove") {
        // Moving to completed todos
        removed.isDone = true;
        const newCompletedTodos = [...completedTodos];
        newCompletedTodos.splice(destination.index, 0, removed);
        setCompletedTodos(newCompletedTodos);
      }

      // Update source list
      setSourceList([...sourceList]);
    }
  };

  console.log(todos)

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <div className='header'>
          <span className='heading'>Taskify</span>
        </div>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
        <Todolist 
        todos={todos} 
        setTodos={setTodos}
        completedTodos={completedTodos} 
        setCompletedTodos ={setCompletedTodos}
        />
      </div>
    </DragDropContext> 
  );
}

export default App;
