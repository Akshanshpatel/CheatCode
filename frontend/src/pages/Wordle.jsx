import { useEffect, useState } from "react";
import GuessRow from "../components/GuessRow";
import Keyboard from "../components/KeyBoard";
import { Game_Rounds, Game_Word_Len } from "@/utils/words";
import Navbar from "@/components/Navbar";
import { answer, validSet } from "@/utils/words";

/* ---------- Wordle Logic Helpers ---------- */

const getLetterCounts = (word) => {
  const map = {};
  for (const char of word) {
    map[char] = (map[char] || 0) + 1;
  }
  return map;
};

const getTileStates = (guess, correct) => {
  const result = Array(Game_Word_Len).fill("gray");
  const counts = getLetterCounts(correct);

  // Pass 1: Greens
  for (let i = 0; i < Game_Word_Len; i++) {
    if (guess[i] === correct[i]) {
      result[i] = "green";
      counts[guess[i]]--;
    }
  }

  // Pass 2: Yellows
  for (let i = 0; i < Game_Word_Len; i++) {
    if (result[i] === "gray" && counts[guess[i]] > 0) {
      result[i] = "yellow";
      counts[guess[i]]--;
    }
  }

  return result;
};

const priority = { gray: 1, yellow: 2, green: 3 };

/* ---------- Component ---------- */

const Wordle = () => {
  const getRandomWord = () => {
  return answer[
    Math.floor(Math.random() * answer.length)
  ];
};

const [correctWord, setCorrectWord] = useState(getRandomWord);


  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  
  const restartGame = () => {
    setCurrentGuess("");
    setGuesses([]);
    setGameOver(false);
    setCorrectWord(getRandomWord());
  };
 const [shakeKeyboard, setShakeKeyboard] = useState(false);
const [error, setError] = useState("");

  /* ---------- Unified Input Handler ---------- */
  const handleInput = (key) => {
    if (gameOver) return;

    if (key === "back") {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }

    if (key === "enter") {
      if (currentGuess.length !== Game_Word_Len) return;
      if (!validSet.has(currentGuess)){
      setShakeKeyboard(true);
  setTimeout(() => setShakeKeyboard(false), 400);
  setError("Not in word list");
  setTimeout(() => setError(""), 1500);
  return;
      }

      const nextGuesses = [...guesses, currentGuess];
      setGuesses(nextGuesses);

      if (
        currentGuess === correctWord ||
        nextGuesses.length === Game_Rounds
      ) {
        setGameOver(true);
      }

      setCurrentGuess("");
      return;
    }

    if (/^[a-z]$/.test(key) && currentGuess.length < Game_Word_Len) {
      setCurrentGuess((prev) => prev + key);
    }
  };

  /* ---------- Physical Keyboard ---------- */
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Backspace") handleInput("back");
      else if (e.key === "Enter") handleInput("enter");
      else if (/^[a-zA-Z]$/.test(e.key)) {
        handleInput(e.key.toLowerCase());
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentGuess, guesses, gameOver]);

  /* ---------- Keyboard Letter States ---------- */
  const letterStates = {};

  guesses.forEach((guess) => {
    const states = getTileStates(guess, correctWord);

    guess.split("").forEach((letter, i) => {
      const newState = states[i];
      const prev = letterStates[letter];

      if (!prev || priority[newState] > priority[prev]) {
        letterStates[letter] = newState;
      }
    });
  });

  /* ---------- Render ---------- */

  return (
  <div>
    <Navbar/>
    <div className="flex w-full justify-center min-h-screen bg-[#18181b] ">
      <div className="flex flex-col items-center gap-6 max-w-md ml-24">
        <h1 className="text-lg md:text-5xl pb-4 mt-8 bg-clip-text text-transparent bg-linear-to-b from-neutral-200 to-neutral-600 text-center font-bold">
          Wordle Game
        </h1>
        {Array(Game_Rounds)
          .fill("")
          .map((_, i) => (
            <GuessRow
              key={i}
              correct={correctWord}
              current={guesses[i] || (i === guesses.length ? currentGuess : "")}
              isSubmitted={i < guesses.length}
              states={
                i < guesses.length
                  ? getTileStates(guesses[i], correctWord)
                  : []
              }
            />
          ))}

        {gameOver && (
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-white text-xl text-center">
  {guesses.includes(correctWord) ? (
    <span>
       <strong>You Won!</strong>🤯 <br />
      Send ss on WhatsApp for choco <br />

      <a
        href="https://wa.me/919528038319?text=I%20won%20the%20game!%20Here%20is%20my%20screenshot"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-3 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        💬WhatsApp
      </a>
    </span>
  ) : (
    <span>
       <strong>You Lose!</strong> 🥀<br />
      Correct word was: <span className="text-red-400">{correctWord}</span>
    </span>
  )}
</h2>


            <button
              onClick={restartGame}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white cursor-pointer font-semibold rounded transition-colors"
            >
              Play Again
            </button>
          </div>
        )}
        
        <Keyboard onKeyPress={handleInput} letterStates={letterStates} shake={shakeKeyboard}/>
       
      </div>
    </div>
  </div>
  );
};

export default Wordle;
