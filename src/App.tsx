import React from 'react';
import './App.css';

let name: string;
let age: number;
let isStudent: boolean;
let hobbies:string[];
let role:[number, string]

let printName: (name: string) => never;


const App: React.FC = () => {
  return (
    <div className="App">
      <span className='heading'>Taskify</span>
    </div>
  );
}

export default App;
