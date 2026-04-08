import { useState } from "react";

function TaskInput({ input, setInput, addTask }) {
  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Új feladat..."
      />
      <button onClick={addTask}>Hozzáadás</button>
    </div>
  );
}

function TaskItem({ task, index, toggleTask, deleteTask }) {
  return (
    <li>
      <span
        onClick={() => toggleTask(index)}
        style={{
          textDecoration: task.done ? "line-through" : "none",
          cursor: "pointer",
          marginRight: "10px",
        }}
      >
        {task.text}
      </span>
      <button onClick={() => deleteTask(index)}>Törlés</button>
    </li>
  );
}

function TaskList({ tasks, toggleTask, deleteTask }) {
  if (tasks.length === 0) {
    return <p>Még nincs feladat a listában.</p>;
  }

  return (
    <ul>
      {tasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          index={index}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  );
}

function App1() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim() === "") return;

    setTasks([...tasks, { text: input, done: false }]);
    setInput("");
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = !updatedTasks[index].done;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const completedCount = tasks.filter((task) => task.done).length;

  return (
    <div>
      <h2>To-do lista</h2>
      <TaskInput input={input} setInput={setInput} addTask={addTask} />
      <TaskList
        tasks={tasks}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
      />
      <p>
        Kész feladatok: {completedCount} / {tasks.length}
      </p>
    </div>
  );
}

export default App1;