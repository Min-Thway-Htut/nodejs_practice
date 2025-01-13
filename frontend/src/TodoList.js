import React, {useState, useEffect} from "react";
import axios from "axios";
import './App.css';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");

    useEffect(() => {
        axios.get('http://localhost:5002/todos')
        .then((response) => {
            setTodos(response.data);
        }).catch((error) => {
            console.error("There was an error fetching the todos!", error);
        })
    }, []);

    const addTodo = () => {
        axios.post('http://localhost:5002/todos', {text: newTodo})
        .then((response) => {
            setTodos([...todos, response.data]);
            setNewTodo("");
        });
    };

    const deleteTodo = (id) => {
        axios.delete(`http://localhost:5002/todos/${id}`)
        .then(() => {
            setTodos(todos.filter((todo) => todo._id !== id));
        });
    };

    return (
        <div class="todolist">
            <h1>To-Do TodoList</h1>
            <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new to-do" />
            <button onClick={addTodo} id="delete-bottom">Add Todo</button>
       <div className="to-do-items">
       <ul>
            {todos.map((todo) => (
                <li key={todo._id}>
                    {todo.text}
                    <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                </li>
            ))}
        </ul>
       </div>
        </div>
    )
};


export default TodoList;
