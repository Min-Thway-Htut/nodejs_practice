import React, {useState, useEffect} from "react";
import axios from 'axios';
import TodoList from "./TodoList";
import './App.css';

function App() {
  return (
    <div className="App">
      <TodoList />
    </div>
  );
}

export default App;
