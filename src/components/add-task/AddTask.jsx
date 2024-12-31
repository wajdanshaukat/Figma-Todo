import React, { useState } from "react";
import SummaryIcon from "../../assets/text-icon.png";
import DescriptionIcon from "../../assets/description-icon.png";
import ClockIcon from "../../assets/clock-icon.png";
import "./add-task.css";

const WebNewTask = ({ addTask, setShowModal }) => {
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newTask = { summary, description, dueDate, id: Date.now() };
    addTask(newTask);
    setShowModal(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">New Task</h5>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className="modal-body">
            <div>
              <img src={SummaryIcon} alt="summary" />
              <input
                type="text"
                placeholder="Summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            </div>
            <div>
              <img src={DescriptionIcon} alt="description" />
              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <img src={ClockIcon} alt="due date" />
              <input
                type="time"
                placeholder="Due date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="submit" className="save">
              Save
            </button>
            <button
              type="button"
              className="cancel"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WebNewTask;
