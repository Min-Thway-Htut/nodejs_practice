import React, {useState, useEffect} from "react";
import axios from 'axios';
import TodoList from "./TodoList";

function App() {
  return (
    <div className="App">
      <TodoList />
    </div>
  );
}

export default App;
