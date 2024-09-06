import React, { useState } from "react";
import "./App.css";
import Column from "./Column";

const Board = () => {
  const [backlog, setBacklog] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [newTicket, setNewTicket] = useState("");

  const handleAddTicket = () => {
    if (newTicket.trim() !== "") {
      setBacklog([...backlog, newTicket]);
      setNewTicket("");
    }
  };

  // Pass the ticketName and sourceColumn name via dataTransfer
  const handleDragStart = (e, task, sourceColumn) => {
    e.dataTransfer.setData("task", task);
    e.dataTransfer.setData("sourceColumn", sourceColumn);
  };

  // Receive the ticketName and sourceColumn name via dataTransfer
  // Push the ticketName to targetColumn array and remove it from sourceColumn
  const handleDrop = (e, targetColumn) => {
    const task = e.dataTransfer.getData("task");
    const sourceColumn = e.dataTransfer.getData("sourceColumn");

    if (targetColumn !== sourceColumn) {
      switch (targetColumn) {
        case "Backlog":
          setBacklog([...backlog, task]);
          break;
        case "InProgress":
          setInProgress([...inProgress, task]);
          break;
        case "Completed":
          setCompleted([...completed, task]);
          break;
        default:
          break;
      }

      switch (sourceColumn) {
        case "Backlog":
          setBacklog(backlog.filter((t) => t !== task));
          break;
        case "InProgress":
          setInProgress(inProgress.filter((t) => t !== task));
          break;
        case "Completed":
          setCompleted(completed.filter((t) => t !== task));
          break;
        default:
          break;
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="input-container">
          <input
            type="text"
            value={newTicket}
            onChange={(e) => setNewTicket(e.target.value)}
            placeholder="Enter new ticket"
          />

          <button onClick={handleAddTicket}>Add Ticket</button>
        </div>
        <div className="columns">
          <Column
            title="Backlog"
            tasks={backlog}
            onDrop={(e) => handleDrop(e, "Backlog")}
            onDragStart={handleDragStart}
            className="column"
          />

          <Column
            title="InProgress"
            tasks={inProgress}
            onDrop={(e) => handleDrop(e, "InProgress")}
            onDragStart={handleDragStart}
            className="column"
          />

          <Column
            title="Completed"
            tasks={completed}
            onDrop={(e) => handleDrop(e, "Completed")}
            onDragStart={handleDragStart}
            className="column"
          />
        </div>
      </div>
    </>
  );
};

export default Board;
