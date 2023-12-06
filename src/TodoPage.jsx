import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const bgListRandom = [
  "#334155",
  "#404040",
  "#b45309",
  "#047857",
  "#0f766e",
  "#0e7490",
  "#0369a1",
  "#6d28d9",
  "#a21caf",
  "#be123c",
];

const initialData = [
  {
    id: 1000,
    title: "A sample task to check app working",
    createdAt: new Date().toLocaleString(),
    status: "pending",
    color: bgListRandom[0],
  },
];

function TodoPage() {
  useEffect(() => {
    AOS.init();
  }, []);

  function handleDelete(id) {
    const newList = todoList.filter((task) => task.id !== id);
    setTodoList(newList);
  }

  function handleEdit(id) {
    let newList = todoList;
    let task = newList.filter((item) => item.id === id);
    newList.slice(newList.indexOf(task), 1);
  }

  function handleCompleted(id) {
    const newList = todoList.map((task) =>
      task.id === id ? { ...task, status: "completed" } : task
    );
    setTodoList(newList);
  }

  function handleFilters(filter) {
    console.log("F ::: ", filter);
    let newList;
    if (filter == "all") {
      newList = mainData;
    } else {
      newList = mainData.filter((task) => task.status === filter);
    }
    console.log("Filtered :: ", newList);
    setTodoList(newList);
  }

  function handleSearch(string) {
    // console.log("F ::: ", string);
    let newList = mainData.filter((task) => task.title.includes(string));
    // console.log("Filtered :: ", newList);
    setTodoList(newList);
  }

  const [todoList, setTodoList] = useState(initialData);
  const [mainData, setMainData] = useState(todoList);
  const [filter, setFilter] = useState("All");
  const [searchString, setSearchString] = useState("");

  function TodoCreate() {
    return (
      <>
        <form
          className="form"
          onSubmit={(form) => {
            console.log("form :: ", form);
            form.preventDefault();
            let task = {
              id: todoList.length + 1,
              title: form.target[0].value,
              createdAt: new Date().toLocaleString(),
              status: "pending",
              color: bgListRandom[Math.floor(Math.random() * 10)],
            };
            setTodoList((prev) => [...prev, task]);
            setMainData(todoList);
          }}
        >
          <input
            className="form-input-text"
            type="text"
            name="todoName"
            id="todoName"
            placeholder="Enter task to do"
            required
          />
          <button className="form-input-button">Create</button>
        </form>
      </>
    );
  }

  function TodoList() {
    return (
      <>
        <div className="filters-parent">
          <input
            className="filter-input-text"
            type="text"
            name="search"
            id="search"
            placeholder="Search for task"
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />
          <select
            className="filter"
            name="filters"
            id="filters"
            onChange={(e) => {
              setFilter(e.target.value);
              handleFilters(e.target.value);
            }}
            value={filter}
          >
            Select Filter
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        {todoList.length > 0
          ? todoList.map((t) => {
              return (
                <>
                  <div
                    key={t.id}
                    style={{
                      backgroundColor: t.color,
                    }}
                    className="todo-items-list"
                    data-aos="fade-left"
                  >
                    <div className="todo-title">
                      <span
                        style={{
                          color: "white",
                          textDecoration:
                            t.status == "completed" ? "line-through" : "none",
                        }}
                      >
                        {t.title}
                      </span>
                      <small
                        style={{
                          color: "white",
                        }}
                      >
                        {t.createdAt}
                      </small>
                    </div>
                    {t.status !== "completed" ? (
                      <div className="todo-buttons">
                        {/* Mark completed button */}
                        <button
                          title="Mark Completed"
                          style={{
                            color: "white",
                            backgroundColor: "transparent",
                            border: "none",
                          }}
                          className="todo-action-button"
                          onClick={(e) => {
                            let confirm = window.confirm(
                              "Would you like complete this task?"
                            );
                            if (confirm) {
                              handleCompleted(t.id);
                            }
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className=""
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </button>

                        {/* Delet button */}
                        <button
                          title="Delete task"
                          style={{
                            color: "white",
                            backgroundColor: "transparent",
                            border: "none",
                          }}
                          className="todo-action-button"
                          onClick={(e) => {
                            let confirm = window.confirm(
                              "Would you like to delete this task ?"
                            );
                            if (confirm) {
                              handleDelete(t.id);
                            }
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className=""
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>

                        {/* Edit button */}
                        <button
                          title="Edit task"
                          style={{
                            color: "white",
                            backgroundColor: "transparent",
                            border: "none",
                          }}
                          className="todo-action-button"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className=""
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <small style={{ color: "white" }}>Completed</small>
                    )}
                  </div>
                </>
              );
            })
          : "No tasks yet, create some !"}
      </>
    );
  }
  return (
    <div className="todo-list-parent">
      <TodoCreate />
      <TodoList />
    </div>
  );
}

export default TodoPage;
