import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">Productivity Dashboard</h1>

      <div className="space-x-6">
        <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition">
          Dashboard
        </Link>
        <Link to="/counter" className="text-gray-700 hover:text-blue-600 transition">
          Counter
        </Link>
        <Link to="/todo" className="text-gray-700 hover:text-blue-600 transition">
          To-Do
        </Link>
        <Link to="/weather" className="text-gray-700 hover:text-blue-600 transition">
          Weather
        </Link>
        <Link to="/pomodoro" className="text-gray-700 hover:text-blue-600 transition">
          Pomodoro
        </Link>
         <Link to="/quiz" className="text-gray-700 hover:text-blue-600 transition">
          Quiz
        </Link>
         <Link to="/notes" className="text-gray-700 hover:text-blue-600 transition">
          Notes
        </Link>
      </div>
    </nav>
  );
}
