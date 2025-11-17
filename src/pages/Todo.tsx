import { useState, useEffect } from "react";
interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function Todo() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  // Load tasks from localStorage when the component mounts
  // useEffect(() => {
  //   const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  //   setTasks(savedTasks);
  // }, []);

  // The problem:
// TypeScript doesn’t know what JSON.parse returns → it becomes any.

// We'll fix this by explicitly telling TypeScript that we expect an array of Task.
//  Load tasks from localStorage when the component mounts
useEffect(() => {
  const raw = localStorage.getItem("tasks");
  if (raw) {
    try {
      const parsed: Task[] = JSON.parse(raw);
      setTasks(parsed);
    } catch {
      console.error("Failed to parse tasks from localStorage");
    }
  }
}, []);


  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (): void => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask("");
  };

  const toggleTask = (id : number): void => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number): void => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-200 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-green-700 mb-6">To-Do List</h1>

      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <div className="flex mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none"
          />
          <button
            onClick={addTask}
            className="bg-green-500 text-white px-4 rounded-r-lg hover:bg-green-600 transition"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {tasks.length === 0 && (
            <p className="text-gray-500 text-center">No tasks yet!</p>
          )}
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg border border-gray-200"
            >
              <span
                onClick={() => toggleTask(task.id)}
                className={`flex-grow cursor-pointer ${
                  task.completed ? "line-through text-gray-400" : "text-gray-700"
                }`}
              >
                {task.text}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700 font-bold"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
