import { useState } from "react";
import "../css/Todo.css";

const TodoEditor = () => {
  const [content, setContent] = useState(""); // 할 일 내용을 저장할 상태

  // 폼 제출 시 호출되는 함수
  const handleSubmit = (e) => {
    e.preventDefault(); // 페이지 새로고침 방지

    // 빈 값일 경우 처리하지 않음
    if (content.trim() === "") {
      alert("할 일을 입력하세요.");
      return;
    }

    // 할 일 데이터
    const newTodo = {
      content: content,
      completed: false, // 초기에는 미완료 상태
    };

    // Spring Boot로 POST 요청 보내기
    fetch("http://localhost:8081/todo/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo), // 할 일 데이터를 JSON 형태로 전송
    })
      .then((response) => {
        if (response.ok) {
          alert("할 일이 성공적으로 추가되었습니다.");
          setContent(""); // 입력 필드 초기화
        } else {
          alert("할 일 추가 중 오류가 발생했습니다.");
        }
      })
      .catch((error) => {
        console.error("Error adding ToDo:", error);
        alert("서버와의 통신 중 오류가 발생했습니다.");
      });
  };

  return (
    <div className="TodoEditor">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)} // 입력 필드 값 업데이트
        />
        <input type="submit" value="추가" />
      </form>
    </div>
  );
};

export default TodoEditor;
