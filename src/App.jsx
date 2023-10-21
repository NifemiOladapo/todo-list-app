import { useEffect, useLayoutEffect, useState } from "react";
import { DeleteOutlined, EditOutlined, DoneOutlined } from "@material-ui/icons";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("user_todos")) ? JSON.parse(localStorage.getItem("user_todos")) : []
  );

  useEffect(() => {
    console.log(todos)
    // if(todos.length === 0){
    //   return
    // }
    localStorage.setItem("user_todos", JSON.stringify(todos));
  }, [todos]);

  const addTodoFunc = () => {
    const input = prompt("New Todo....");
    if (input === null || input === "") return;
    if(input.length > 100)return alert("Please reduce your todo length")
    setTodos([
      ...todos,
      {
        
        id: todos.length === 0 ? 1 : todos[todos.length-1].id + 1,
        name: input,
        completed: false,
      },
    ]);
  };

  const deleteTodo = (todoId) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  };

  const markTodo = (todoId) => {
    const editedTodo = todos.find((todo) => todo.id === todoId);
    if (editedTodo.completed) {
      editedTodo.completed = false;
    } else {
      editedTodo.completed = true;
    }
    setTodos([...todos]);
  };

  return (
    <div className="app">
      <div className="main__card">
        <button onClick={addTodoFunc}>ADD TODO</button>
        <div className="todos">
          {todos.map((todo) => (
            <div key={todo.id} className="a_todo">
              <p
                style={
                  {textDecoration : todo.completed ? "line-through" : null}
                }
              >
                {todo.name}
              </p>
              <div className="icons__wrapper">
                <EditOutlined />
                <DoneOutlined onClick={() => markTodo(todo.id)} />
                <DeleteOutlined onClick={() => deleteTodo(todo.id)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
