import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import { Todo } from './components/model';
import Todolist from './components/Todolist';
import { DragDropContext } from 'react-beautiful-dnd'


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

  console.log(todos)

  return (
    <DragDropContext onDragEnd={() => {}}>
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
