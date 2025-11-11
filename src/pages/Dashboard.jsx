import { Link } from "react-router-dom";

export default function Dashboard() {
  const tools = [
    { name: "Counter", path: "/counter", color: "from-blue-200 to-blue-400" },
    { name: "To-Do List", path: "/todo", color: "from-amber-200 to-yellow-400" },
    { name: "Weather", path: "/weather", color: "from-sky-200 to-sky-400" },
    { name: "Quiz", path: "/quiz", color: "from-purple-200 to-purple-400" },
    { name: "Notes", path: "/notes", color: "from-green-200 to-green-400" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col items-center py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-10">
        Productivity Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-4/5 max-w-4xl">
        {tools.map((tool) => (
          <Link
            key={tool.name}
            to={tool.path}
            className={`bg-gradient-to-br ${tool.color} p-8 rounded-2xl shadow-lg text-center font-semibold text-gray-800 hover:scale-105 hover:shadow-2xl transition-all`}
          >
            {tool.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
