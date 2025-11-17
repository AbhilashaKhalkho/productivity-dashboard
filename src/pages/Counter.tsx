import { useEffect, useState } from "react";

const STORAGE_KEY = "pd_counter_value";

export default function Counter(): JSX.Element {
  // load initial from localStorage (if present)
  const [count, setCount] = useState<number>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw !== null ? JSON.parse(raw) : 0;
    } catch {
      return 0;
    }
  });

  // persist count to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(count));
    } catch {}
  }, [count]);

  // keyboard shortcuts: + increments, - decrements, r resets
  useEffect(() => {
    function onKey(e: KeyboardEvent): void {
      if (e.key === "+" || e.key === "=") setCount((c) => c + 1);
      if (e.key === "-") setCount((c) => c - 1);
      if (e.key.toLowerCase() === "r") {
        if (confirm("Reset counter to 0?")) setCount(0);
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const increment = (): void => setCount((c) => c + 1);
  const decrement = (): void => setCount((c) => c - 1);

  const reset = (): void => {
    if (confirm("Are you sure you want to reset the counter?")) setCount(0);
  };

  const add = (n: number): void => setCount((c) => c + n);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow p-8 text-center">
        <h2 className="text-2xl font-semibold mb-2">Counter</h2>
        <p className="text-sm text-gray-500 mb-6">
          Simple counter demo — built with React useState.
        </p>

        <div className="text-6xl font-bold text-blue-600 my-6">{count}</div>

        <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
          <button
            onClick={decrement}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 shadow"
            aria-label="decrement"
          >
            −
          </button>

          <button
            onClick={increment}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow"
            aria-label="increment"
          >
            +
          </button>

          <button
            onClick={() => add(5)}
            className="px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border"
          >
            +5
          </button>

          <button
            onClick={() => add(-5)}
            className="px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border"
          >
            -5
          </button>

          <button
            onClick={reset}
            className="px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border"
          >
            Reset
          </button>
        </div>

        <p className="text-xs text-gray-400">
          Tip: Use <span className="font-medium">+</span> /{" "}
          <span className="font-medium">-</span> keys to change value,{" "}
          <span className="font-medium">R</span> to reset.
        </p>
      </div>
    </div>
  );
}
