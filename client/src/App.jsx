import { useEffect, useState } from "react";
import Todo from "./todo";
import './styles.css';

export default function App() {
  //const [message, setMessage] = useState("");
  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    async function getTodos() {
      const response = await fetch("/api/todos");
      const todos = await response.json();

      //console.log(todos);
      //setMessage(todos.msg);
      setTodos(todos);

    }
    getTodos();
  }, [])

  //console.log("Hello, world!");

  const crateNewTodo = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ todo: content })
    });

    const todo = await response.json();
    //console.log(todo);

    setTodos([...todos, todo]);
    setContent("");
  }

  return (
    <main className="container">
      <h1 className="title">
        Welcome To Dotun's Todo App
      </h1>
      <form className="form" onSubmit={crateNewTodo}> 
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter a todo"
          className="form__input"
          required
        />
        <button className="form__button" type="submit">Create Todo</button>
      </form>
      <div className="todos">
        {(todos.length > 0) && //<pre>{//JSON.stringify(todos, null, 2)}</pre>
          todos.map((todo) => (
            <Todo key={todo._id} todo={todo} setTodos={setTodos} />
          ))
          }
      </div>
    </main>
  );
}
