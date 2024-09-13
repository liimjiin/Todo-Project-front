import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import "../css/Todo.css";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8081/todo/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("데이터를 불러오는 중 문제가 발생했습니다.");
        }
        return response.json();
      })
      .then((data) => {
        setTodos(data); // 데이터를 상태에 저장
      })
      .catch((error) => {
        setError("할 일을 불러오는 중 문제가 발생했습니다.");
        console.error("Error:", error);
      });
  }, []);

  // 삭제된 할 일을 리스트에서 제거
  const handleDelete = (deletedNumber) => {
    setTodos(todos.filter((todo) => todo.number !== deletedNumber));
  }

  return (
    <div className="TodoList">
      <h4>Todo List</h4>
      {error && <p className="error-message">{error}</p>}
      {todos.length > 0 ? (
        todos.map((todo) => <TodoItem key={todo.number} todo={todo} onDelete={handleDelete} />)
      ) : (
        <p>할 일이 없습니다.</p>
      )}
    </div>
  );
};

export default TodoList;
