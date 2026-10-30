
import { useEffect, useRef, useState } from "react";

const SYMBOLS = ["🎮", "🚀", "⭐", "💎", "👾", "🏆", "🔥", "🎯"];

function createCards() {
  return [...SYMBOLS, ...SYMBOLS]
    .map((symbol, index) => ({
      id: index,
      symbol,
      matched: false
    }))
    .sort(() => Math.random() - 0.5);
}

function Memory() {
  const [cards, setCards] = useState(createCards);
  const [selected, setSelected] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [started, setStarted] = useState(false);
  const [locked, setLocked] = useState(false);

  const timeoutRef = useRef(null);

  const completed = cards.every((card) => card.matched);
  const matchedPairs = cards.filter((card) => card.matched).length / 2;

  useEffect(() => {
    if (!started || completed) return;

    const timer = setInterval(() => {
      setSeconds((previous) => previous + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [started, completed]);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  function handleCardClick(id) {
    if (locked || completed) return;

    const card = cards.find((item) => item.id === id);

    if (!card || card.matched || selected.includes(id)) {
      return;
    }

    if (!started) setStarted(true);

    const nextSelected = [...selected, id];
    setSelected(nextSelected);

    if (nextSelected.length !== 2) return;

    setAttempts((previous) => previous + 1);
    setLocked(true);

    const first = cards.find(
      (item) => item.id === nextSelected[0]
    );

    const second = cards.find(
      (item) => item.id === nextSelected[1]
    );

    if (first.symbol === second.symbol) {
      timeoutRef.current = setTimeout(() => {
        setCards((previous) =>
          previous.map((item) =>
            nextSelected.includes(item.id)
              ? { ...item, matched: true }
              : item
          )
        );

        setSelected([]);
        setLocked(false);
      }, 500);
    } else {
      timeoutRef.current = setTimeout(() => {
        setSelected([]);
        setLocked(false);
      }, 1000);
    }
  }

  function restartGame() {
    clearTimeout(timeoutRef.current);
    setCards(createCards());
    setSelected([]);
    setAttempts(0);
    setSeconds(0);
    setStarted(false);
    setLocked(false);
  }

  function formatTime(value) {
    const minutes = Math.floor(value / 60);
    const remaining = value % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remaining
    ).padStart(2, "0")}`;
  }

  return (
    <div className="memory-game">
      <h2>Memory Challenge</h2>

      <p className="memory-description">
        Encuentra las 8 parejas de cartas iguales.
        ¡Pon a prueba tu memoria!
      </p>

      <div className="memory-stats">
        <div>
          <span>Parejas</span>
          <strong>{matchedPairs} / 8</strong>
        </div>

        <div>
          <span>Intentos</span>
          <strong>{attempts}</strong>
        </div>

        <div>
          <span>Tiempo</span>
          <strong>{formatTime(seconds)}</strong>
        </div>
      </div>

      {completed && (
        <div className="memory-victory">
          <h3>🏆 ¡Felicidades, ganaste!</h3>
          <p>
            Completaste el juego en {attempts} intentos
            y {formatTime(seconds)}.
          </p>
        </div>
      )}

      <div className="memory-board">
        {cards.map((card) => {
          const visible =
            card.matched || selected.includes(card.id);

          return (
            <button
              key={card.id}
              type="button"
              className={`memory-card ${
                visible ? "memory-flipped" : ""
              } ${card.matched ? "memory-matched" : ""}`}
              onClick={() => handleCardClick(card.id)}
              disabled={locked || card.matched || visible}
              aria-label={
                visible
                  ? `Carta ${card.symbol}`
                  : "Carta oculta"
              }
            >
              <span className="memory-card-inner">
                <span className="memory-card-front">?</span>
                <span className="memory-card-back">
                  {card.symbol}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <button
        className="memory-restart"
        onClick={restartGame}
      >
        Reiniciar juego
      </button>
    </div>
  );
}

export default Memory;
