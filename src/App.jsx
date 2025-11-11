import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Counter from "./pages/Counter";
import Todo from "./pages/Todo";
import Weather from "./pages/Weather";
import Pomodoro from "./pages/Pomodoro";
import Quiz from "./pages/Quiz";
import Notes from "./pages/Notes";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1 py-8">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/pomodoro" element={<Pomodoro />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/notes" element={<Notes />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
