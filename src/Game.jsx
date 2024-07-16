import React from "react";
import Dice from "./Dice";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

export default function Game() {
  const [numbers, setNumbers] = React.useState([]);
  const [gameOver, setGameOver] = React.useState(false);

  const { width, height } = useWindowSize();
  const diceElements = numbers.map((num, index) => {
    return (
      <Dice
        number={num.value}
        key={index}
        id={index}
        handleDice={handleDice}
        frozen={num.frozen}
      />
    );
  });

  function createInitialNumbers() {
    return Array(10)
      .fill()
      .map(() => ({
        value: Math.floor(Math.random() * 6 + 1),
        frozen: false,
      }));
  }

  function handleRoll() {
    if (gameOver) {
      setNumbers(createInitialNumbers());
      setGameOver(false);
    } else {
      setNumbers((prevState) =>
        prevState.map((num) =>
          num.frozen
            ? num
            : { ...num, value: Math.floor(Math.random() * 6 + 1) }
        )
      );
    }
  }

  function handleDice(id) {
    setNumbers((prevNumbers) =>
      prevNumbers.map((num, index) =>
        index === id ? { ...num, frozen: !num.frozen } : num
      )
    );
  }

  React.useEffect(() => {
    setNumbers(createInitialNumbers());
  }, []);

  React.useEffect(() => {
    let count = 0;
    let current = null;
    if (numbers.length > 0) {
      numbers.forEach((num) => {
        if (num.frozen && current === null) {
          current = num.value;
          count += 1;
        } else if (num.frozen && current !== null && num.value === current) {
          count += 1;
        }
      });
    }
    if (count === 10) {
      setGameOver(true);
    }
  }, [numbers]);

  return (
    <section className="game">
      {gameOver && <Confetti width={width} height={height} run={gameOver} />}
      <article className="game__info">
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      </article>
      <div className="dice-wrapper">{diceElements}</div>
      <button
        className="roll--button"
        onClick={handleRoll}
        aria-label={gameOver ? "Start new game" : "Roll dice"}
      >
        {gameOver ? "New Game" : "Roll"}
      </button>
    </section>
  );
}
