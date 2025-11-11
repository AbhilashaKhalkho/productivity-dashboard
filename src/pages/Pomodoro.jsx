import { useEffect, useRef, useState } from "react";

const DEFAULT_MINUTES = 25; // default pomodoro length

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function Pomodoro() {
  const [minutes] = useState(DEFAULT_MINUTES);
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_MINUTES * 60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  // start timer
  const start = () => {
    if (running) return;
    setRunning(true);
  };

  // pause timer
  const pause = () => {
    setRunning(false);
  };

  // reset timer
  const reset = () => {
    setRunning(false);
    setSecondsLeft(minutes * 60);
  };

  // small helper to play sound
  const playAlarm = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  // main effect: handles interval based on `running`
  useEffect(() => {
    if (running) {
      // avoid multiple intervals
      if (intervalRef.current) return;
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            // stop and alarm when reaching zero
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setRunning(false);
            playAlarm();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      // clear interval if not running
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [running]);

  // format progress percent for a circular-ish bar or progress bar
  const total = minutes * 60;
  const progress = Math.max(0, Math.min(100, Math.round(((total - secondsLeft) / total) * 100)));

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-purple-200 flex flex-col items-center py-12">
      <h1 className="text-4xl font-bold text-purple-800 mb-8">Pomodoro Timer</h1>

      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
        <div className="mb-6">
          <div className="text-6xl font-mono font-bold text-purple-700">{formatTime(secondsLeft)}</div>
          <div className="text-sm text-gray-500 mt-2">Focus for {minutes} minutes</div>
        </div>

        <div className="flex items-center justify-center gap-3 mb-4">
          <button
            onClick={start}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition disabled:opacity-50"
            disabled={running || secondsLeft === 0}
          >
            Start
          </button>

          <button
            onClick={pause}
            className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition disabled:opacity-50"
            disabled={!running}
          >
            Pause
          </button>

          <button
            onClick={reset}
            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg border hover:bg-red-100 transition"
          >
            Reset
          </button>
        </div>

        <div className="mt-4">
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">{progress}% elapsed</p>
        </div>
      </div>

      {/* hidden audio element */}
      <audio
        ref={audioRef}
        src="data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA=" // tiny silent placeholder (won't produce sound)
      />
      <p className="text-xs text-gray-500 mt-6">Tip: Press Start to begin. Timer will play a sound when finished.</p>
    </div>
  );
}
