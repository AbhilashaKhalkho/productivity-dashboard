import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [quote, setQuote] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const quotes = [
    "Success is the sum of small efforts, repeated day in and day out.",
    "Focus on being productive instead of busy.",
    "Your future is created by what you do today, not tomorrow.",
    "Small progress is still progress.",
    "Discipline is choosing what you want most over what you want now.",
    "The key is not to prioritize what's on your schedule, but to schedule your priorities."
  ];

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, [quotes]);

  const tools = [
    { name: "Counter", path: "/counter", color: "from-blue-200 to-blue-400" },
    { name: "To-Do List", path: "/todo", color: "from-amber-200 to-yellow-400" },
    { name: "Weather", path: "/weather", color: "from-sky-200 to-sky-400" },
    { name: "Quiz", path: "/quiz", color: "from-purple-200 to-purple-400" },
    { name: "Notes", path: "/notes", color: "from-green-200 to-green-400" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-100 to-gray-200 flex flex-col items-center py-12 px-4">

      {/* Welcome Banner */}
      <div className="bg-blue-600 text-white rounded-2xl p-8 shadow-lg w-full max-w-4xl mb-10 text-center">
        <h1 className="text-4xl font-bold mb-2">Welcome Back! 👋</h1>
        <p className="text-lg opacity-90">
          Let's make today productive and meaningful.
        </p>
      </div>

      {/* Quote of the Day */}
      <div className="bg-white rounded-2xl p-6 shadow w-full max-w-3xl mb-12 text-center border">
        <h2 className="text-xl font-semibold mb-3">✨ Quote of the Day</h2>
        <p className="text-gray-700 italic">"{quote}"</p>
      </div>

      {/* Dashboard Title */}
      <h1 className="text-4xl font-bold text-gray-800 mb-10">
        Productivity Dashboard
      </h1>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-4/5 max-w-4xl">
        {tools.map((tool) => (
          <Link
            key={tool.name}
            to={tool.path}
            className={`bg-linear-to-br ${tool.color} p-8 rounded-2xl shadow-lg text-center font-semibold text-gray-800 hover:scale-105 hover:shadow-2xl transition-all`}
          >
            {tool.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
