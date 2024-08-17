import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  function handleAdd(question) {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(question),
    })
      .then((response) => response.json())
      .then((data) => setQuestions([...questions, data]));
  }

  function handleUpdate(question) {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(question),
    })
      .then((response) => response.json())
      .then((data) => {
        setQuestions((oldQuestions) =>
          oldQuestions.map((q) => (q.id === question.id ? data : q))
        );
      });
  }

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then(() =>
        setQuestions(questions.filter((question) => question.id !== id))
      )
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAdd={handleAdd} />
      ) : (
        <QuestionList
          questions={questions}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </main>
  );
}

export default App;
