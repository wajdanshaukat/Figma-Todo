import React, { useState } from "react";
import WebNewTask from "../add-task/AddTask";
import SideBar from "../side-bar/Side-bar";
import "./web-task.css";

const WebTask = () => {
  const [incompleteTasks, setIncompleteTasks] = useState([]);
  const [completeTasks, setCompleteTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const addTask = (newTask) => {
    setIncompleteTasks((prevTasks) => [...prevTasks, newTask]);
    setShowModal(false);
  };

  const moveTask = (task, isCompleted) => {
    if (isCompleted) {
      setCompleteTasks((prev) => [...prev, task]);
      setIncompleteTasks((prev) => prev.filter((t) => t.id !== task.id));
    } else {
      setIncompleteTasks((prev) => [...prev, task]);
      setCompleteTasks((prev) => prev.filter((t) => t.id !== task.id));
    }
  };

  return (
    <div className="main-container">
      <SideBar />
      <div className="sub-main">
        <div className="right-container">
          <button type="button" onClick={() => setShowModal(true)}>
            + Add New Task
          </button>

          {showModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <WebNewTask addTask={addTask} setShowModal={setShowModal} />
                <button onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          )}

          <div className="Incomplete-box">
            <h4>Incomplete Tasks</h4>
            {incompleteTasks.map((task) => (
              <div className="row" key={task.id}>
                <label>
                  <input
                    type="checkbox"
                    className="checkBtn"
                    onChange={() => moveTask(task, true)}
                  />
                  <p>{task.summary}</p>
                </label>
                <span>
                  ⏰ {task.description}, {task.dueDate}
                </span>
              </div>
            ))}
          </div>

          <div className="Complete-box">
            <h4>Completed Tasks</h4>
            {completeTasks.map((task) => (
              <div className="row completed-row" key={task.id}>
                <label>
                  <input
                    type="checkbox"
                    className="checkBtn"
                    checked
                    onChange={() => moveTask(task, false)}
                  />
                  <p className="completed">{task.summary}</p>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebTask;
