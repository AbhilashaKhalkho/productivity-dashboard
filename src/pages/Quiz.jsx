import { useState } from "react";

const sampleQuestions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Trainer Marking Language",
      "Hyper Text Markup Language",
      "Hyper Text Marketing Language",
      "Hyper Text Markup Leveler",
    ],
    answer: 1,
  },
  {
    question: "Which company developed React?",
    options: ["Google", "Microsoft", "Meta", "Amazon"],
    answer: 2,
  },
  {
    question: "Which hook is used to manage state in React?",
    options: ["useEffect", "useRef", "useState", "useMemo"],
    answer: 2,
  },
  {
    question: "What command starts a Vite dev server?",
    options: ["npm run start", "npm run dev", "npm start", "npm serve"],
    answer: 1,
  },
];

export default function Quiz() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = sampleQuestions[index];

  const handleSelect = (optionIndex) => {
    setSelected(optionIndex);
  };

  const handleNext = () => {
    if (selected === null) return;

    if (selected === current.answer) {
      setScore(score + 1);
    }

    if (index + 1 < sampleQuestions.length) {
      setIndex(index + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-100 to-yellow-200 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
          <h1 className="text-3xl font-bold text-yellow-700 mb-4">
            Quiz Finished!
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            You scored <span className="font-bold">{score}</span> out of{" "}
            {sampleQuestions.length}
          </p>
          <button
            onClick={handleRestart}
            className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 to-yellow-200 flex flex-col items-center py-12">
      <h1 className="text-4xl font-bold text-yellow-700 mb-8">Quiz App</h1>

      <div className="bg-white p-8 rounded-2xl shadow-lg w-[28rem]">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          {index + 1}. {current.question}
        </h2>

        <div className="space-y-3">
          {current.options.map((opt, i) => {
            const isSelected = i === selected;
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={`w-full text-left px-4 py-2 border rounded-lg transition
                  ${
                    isSelected
                      ? "bg-yellow-100 border-yellow-400"
                      : "hover:bg-gray-50"
                  }`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleNext}
            disabled={selected === null}
            className="px-5 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition disabled:opacity-50"
          >
            {index + 1 === sampleQuestions.length ? "Finish" : "Next"}
          </button>
        </div>
      </div>

      <p className="text-gray-500 mt-4 text-sm">
        Question {index + 1} / {sampleQuestions.length}
      </p>
    </div>
  );
}
