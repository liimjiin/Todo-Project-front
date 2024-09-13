import "../css/Todo.css";
import { useState } from 'react';

const TodoItem = ({ todo, onDelete }) => {
  const [content, setContent] = useState(todo.content); // 수정할 content 상태
  const [completed, setCompleted] = useState(todo.completed); // 수정할 completed 상태

  // 서버에 업데이트 요청
  const updateTodo = (updatedTodo) => {
    fetch(`http://localhost:8081/todo/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    })
      .then((response) => {
        if (!response.ok) {
          alert("업데이트 중 오류가 발생했습니다.");
        }
      })
      .catch((error) => {
        console.error("Error updating ToDo: ", error);
        alert("서버와의 통신 중 오류가 발생했습니다.");
      });
  };

  // 완료 상태 변경 핸들러
  const handleCompletedChange = () => {
    const updatedTodo = { ...todo, completed: !completed, content };
    setCompleted(!completed);
    updateTodo(updatedTodo); // 서버에 업데이트 요청
  };

  // 내용 수정 핸들러
  const handleContentChange = (e) => {
    const updatedTodo = { ...todo, content: e.target.value, completed };
    setContent(e.target.value);
    updateTodo(updatedTodo); // 서버에 업데이트 요청
  };

  // 삭제 시 호출되는 함수
  const handleDelete = () => {
    fetch(`http://localhost:8081/todo/delete?number=${todo.number}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          onDelete(todo.number); // 삭제 후 부모 컴포넌트에서 상태 업데이트
        } else {
          alert("삭제 중 오류가 발생했습니다.");
        }
      })
      .catch((error) => {
        console.error("Error deleting ToDo: ", error);
        alert("서버와의 통신 중 오류가 발생했습니다.");
      });
  };

  return (
    <div className="TodoItem">
      <div className="checkbox_col">
        <input
          type="checkbox"
          checked={completed}
          onChange={handleCompletedChange} // 완료 상태 변경 이벤트
        />
      </div>
      <input
        type="text"
        value={content}
        onChange={handleContentChange} // 내용 변경 이벤트
      />
      <div className="btn_col">
        <button onClick={handleDelete}>x</button>
      </div>
    </div>
  );
};

export default TodoItem;
