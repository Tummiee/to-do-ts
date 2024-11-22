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
      <div className='header'>
        <span className='heading'>Taskify</span>
      </div>
    </div>
  );
}

export default App;
