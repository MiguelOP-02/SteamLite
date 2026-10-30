
import { useEffect, useRef, useState } from "react";

const SIZE = 20;
const INITIAL_SNAKE = [
  { x: 5, y: 10 },
  { x: 4, y: 10 },
  { x: 3, y: 10 }
];

const DIRECTIONS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }
};

function createFood(snake) {
  const freeCells = [];

  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      if (!snake.some((part) => part.x === x && part.y === y)) {
        freeCells.push({ x, y });
      }
    }
  }

  if (freeCells.length === 0) return null;

  return freeCells[Math.floor(Math.random() * freeCells.length)];
}

function initialGame() {
  return {
    snake: INITIAL_SNAKE.map((part) => ({ ...part })),
    food: { x: 14, y: 10 },
    direction: DIRECTIONS.ArrowRight,
    score: 0,
    status: "ready"
  };
}

function Snake() {
  const [game, setGame] = useState(initialGame);
  const directionRef = useRef(DIRECTIONS.ArrowRight);

  const speed = Math.max(80, 180 - game.score * 5);

  function changeDirection(key) {
    const next = DIRECTIONS[key];
    if (!next) return;

    const current = directionRef.current;

    if (
      next.x === -current.x &&
      next.y === -current.y
    ) {
      return;
    }

    directionRef.current = next;
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (DIRECTIONS[event.key]) {
        event.preventDefault();
        changeDirection(event.key);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (game.status !== "playing") return;

    const timer = setInterval(() => {
      setGame((previous) => {
        if (previous.status !== "playing") return previous;

        const direction = directionRef.current;
        const head = previous.snake[0];

        const newHead = {
          x: head.x + direction.x,
          y: head.y + direction.y
        };

        const eating =
          previous.food &&
          newHead.x === previous.food.x &&
          newHead.y === previous.food.y;

        const bodyToCheck = eating
          ? previous.snake
          : previous.snake.slice(0, -1);

        const hitWall =
          newHead.x < 0 ||
          newHead.x >= SIZE ||
          newHead.y < 0 ||
          newHead.y >= SIZE;

        const hitBody = bodyToCheck.some(
          (part) =>
            part.x === newHead.x &&
            part.y === newHead.y
        );

        if (hitWall || hitBody) {
          return { ...previous, status: "over" };
        }

        const newSnake = [newHead, ...previous.snake];

        if (!eating) newSnake.pop();

        const newScore = previous.score + (eating ? 10 : 0);
        const newFood = eating
          ? createFood(newSnake)
          : previous.food;

        return {
          snake: newSnake,
          food: newFood,
          direction,
          score: newScore,
          status: newFood === null ? "won" : "playing"
        };
      });
    }, speed);

    return () => clearInterval(timer);
  }, [game.status, speed]);

  function startGame() {
    if (game.status === "paused") {
      setGame((previous) => ({
        ...previous,
        status: "playing"
      }));
      return;
    }

    directionRef.current = DIRECTIONS.ArrowRight;
    setGame({ ...initialGame(), status: "playing" });
  }

  function togglePause() {
    setGame((previous) => ({
      ...previous,
      status:
        previous.status === "playing" ? "paused" : "playing"
    }));
  }

  const occupied = new Map(
    game.snake.map((part, index) => [
      `${part.x}-${part.y}`,
      index === 0 ? "head" : "body"
    ])
  );

  return (
    <div className="snake-game">
      <h2>Snake Classic</h2>

      <div className="snake-stats">
        <span>Puntuación: {game.score}</span>
        <span>Velocidad: {Math.round(1000 / speed)}</span>
      </div>

      <div className="snake-board">
        {Array.from({ length: SIZE * SIZE }, (_, index) => {
          const x = index % SIZE;
          const y = Math.floor(index / SIZE);
          const part = occupied.get(`${x}-${y}`);

          const isFood =
            game.food?.x === x && game.food?.y === y;

          return (
            <div
              key={index}
              className={[
                "snake-cell",
                part === "head" ? "snake-head" : "",
                part === "body" ? "snake-body" : "",
                isFood ? "snake-food" : ""
              ].join(" ")}
            />
          );
        })}
      </div>

      <div className="snake-message" aria-live="polite">
        {game.status === "ready" && "Presiona Iniciar juego"}
        {game.status === "playing" && "¡Recoge la comida roja!"}
        {game.status === "paused" && "Juego en pausa"}
        {game.status === "over" && "¡Game Over!"}
        {game.status === "won" && "¡Ganaste!"}
      </div>

      <div className="snake-buttons">
        <button onClick={startGame}>
          {game.status === "paused"
            ? "Continuar"
            : "Iniciar / Reiniciar"}
        </button>

        <button
          onClick={togglePause}
          disabled={
            game.status !== "playing" &&
            game.status !== "paused"
          }
        >
          {game.status === "paused" ? "Continuar" : "Pausar"}
        </button>
      </div>

      <div className="snake-controls">
        <button onClick={() => changeDirection("ArrowUp")}>
          ↑
        </button>

        <div>
          <button onClick={() => changeDirection("ArrowLeft")}>
            ←
          </button>
          <button onClick={() => changeDirection("ArrowDown")}>
            ↓
          </button>
          <button onClick={() => changeDirection("ArrowRight")}>
            →
          </button>
        </div>
      </div>

      <p className="snake-help">
        Usa las flechas del teclado o los controles en pantalla.
      </p>
    </div>
  );
}

export default Snake;
