

/*export default function Todo(props) {
    const { todo, setTodos } = props;

    const updateTodo = async (todoId, todoStatus) => {
        const response = await fetch(`/api/todos/${todoId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status: todoStatus })
        });

        const json = await response.json();
        if (json.acknowledged) {
            setTodos(currentTodos => {
                return currentTodos.map((currentTodo) => {
                    if (currentTodo._id === todoId) {
                        return { ...currentTodo, status: !currentTodo.status };
                    }
                    return currentTodo;
                });
            });
        }
    };

    const deleteTodo = async (todoId) => {
        const response = await fetch(`/api/todos/${todoId}`, {
            method: "DELETE"
        });

        const json = await response.json();
        if (json.acknowledged) {
            setTodos(currentTodos => {
                return currentTodos
                .filter((currentTodo) => (currentTodo._id !== todoId));
            });
        }
    }

    return (
        <div key={todo._id} className="todo">
            <p>{todo.todo}</p>
            <div className="mutations">
                <button 
                    className="todo__status"
                    onClick={() => updateTodo(todo._id, todo.status)}
                >
                    {(todo.status) ? "☑" : "☐"}
                </button>
                <button
                    className="todo__delete"
                    onClick={() => deleteTodo(todo._id)}
                > 
                🗑️
                </button>
            </div>
        </div>

    );
}*/

import { useState } from "react";

export default function Todo(props) {
  const { todo, setTodos } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(todo.todo);

  const updateTodo = async (todoId, todoStatus) => {
    const response = await fetch(`/api/todos/${todoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status: !todoStatus })
    });
    const json = await response.json();
    if (json.acknowledged) {
      setTodos(currentTodos => {
        return currentTodos.map((currentTodo) => {
          if (currentTodo._id === todoId) {
            return { ...currentTodo, status: !currentTodo.status };
          }
          return currentTodo;
        });
      });
    }
  };

  const deleteTodo = async (todoId) => {
    const response = await fetch(`/api/todos/${todoId}`, {
      method: "DELETE"
    });
    const json = await response.json();
    if (json.acknowledged) {
      setTodos(currentTodos => {
        return currentTodos.filter((currentTodo) => currentTodo._id !== todoId);
      });
    }
  };

  const editTodo = async (todoId) => {
    const response = await fetch(`/api/todos/${todoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ todo: newContent })
    });
    const json = await response.json();
    if (json.acknowledged) {
      setTodos(currentTodos => {
        return currentTodos.map((currentTodo) => {
          if (currentTodo._id === todoId) {
            return { ...currentTodo, todo: newContent };
          }
          return currentTodo;
        });
      });
      setIsEditing(false);
    }
  };

  return (
    <div key={todo._id} className="todo">
      {isEditing ? (
        <input
          type="text"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
      ) : (
        <p>{todo.todo}</p>
      )}
      <div className="mutations">
        <button 
          className="todo__status"
          onClick={() => updateTodo(todo._id, todo.status)}
        >
          {todo.status ? "☑" : "☐"}
        </button>
        <button
          className="todo__delete"
          onClick={() => deleteTodo(todo._id)}
        > 
          🗑️
        </button>
        {isEditing ? (
          <button className="todo__edit" onClick={() => editTodo(todo._id)}>Save</button>
        ) : (
          <button className="todo__edit" onClick={() => setIsEditing(true)}>Edit</button>
        )}
      </div>
    </div>
  );
}
