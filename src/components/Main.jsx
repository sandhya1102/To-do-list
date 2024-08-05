import React, { useState, useEffect } from "react";
import { Todoprovider } from "../contexts/Todocontext";
import Tasklist from "./Tasklist";
import Task from "./Task";

function Main() {
  const [todos, setTodos] = useState([]);

  const Add = (title) => {
    setTodos((prev) => [{ id: Date.now(), ...title }, ...prev]);
  };

  const Updated = (id, title) => {
    setTodos((prev) =>
      prev.map((prevtitle) => (prevtitle.id === id ? title : prevtitle))
    );
  };

  const Delete = (id) => {
    setTodos((prev) => prev.filter((title) => title.id !== id));
  };

  const Taskdone = (id) => {
    setTodos((prev) =>
      prev.map((prevtitle) =>
        prevtitle === id
          ? { ...prevtitle, completed: !prevtitle.completed }
          : prevtitle
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <Todoprovider value={{ todos, Add, Updated, Delete, Taskdone }}>
      <div className="bg-[#70bdb1]  py-10 ">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-black">
          <h1 className="text-3xl font-bold text-center mb-5 mt-2">
            To Do List
          </h1>
          <div className="mb-4">
            <Task />
          </div>
          <div className="flex flex-wrap gap-y-4">
            {todos.map((title) => (
              <div key={title.id} className="w-full">
                <Tasklist title={title} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Todoprovider>
  );
}

export default Main;
