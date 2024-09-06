const Column = ({ title, tasks, onDrop, onDragStart }) => {
  return (
    <div
      className="column"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      <div
        style={{
          textAlign: "center",
          fontsize: "20px",
          fontweight: "bold",
          margintop: "0",
        }}
      >
        <h2>{title}</h2>
      </div>
      {tasks.map((task, index) => (
        <div
          style={{
            backgroundColor: "white",
            padding: "10px",
            margintop: "10px",
            borderradius: " 4px",
            border: " 1px solid #ccc",
          }}
          key={index}
          className="task"
          draggable
          onDragStart={(e) => onDragStart(e, task, title)}
        >
          {task}
        </div>
      ))}
    </div>
  );
};

export default Column;
