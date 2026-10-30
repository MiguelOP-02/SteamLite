
import { useState } from "react";

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function calculateWinner(board) {
  for (const [a, b, c] of winningLines) {
    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return board[a];
    }
  }

  return null;
}

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [scores, setScores] = useState({
    X: 0,
    O: 0,
    draws: 0
  });

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(Boolean);

  function handleClick(index) {
    if (board[index] || winner || isDraw) return;

    const nextBoard = [...board];
    nextBoard[index] = currentPlayer;

    const newWinner = calculateWinner(nextBoard);
    const draw = !newWinner && nextBoard.every(Boolean);

    setBoard(nextBoard);

    if (newWinner) {
      setScores((previous) => ({
        ...previous,
        [newWinner]: previous[newWinner] + 1
      }));
    } else if (draw) {
      setScores((previous) => ({
        ...previous,
        draws: previous.draws + 1
      }));
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  }

  function restartGame() {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
  }

  function resetScores() {
    restartGame();
    setScores({ X: 0, O: 0, draws: 0 });
  }

  return (
    <div className="tictactoe">
      <h2>Tres en Raya</h2>

      <p className="ttt-instructions">
        Juega con un amigo. Los jugadores X y O
        se turnan para marcar las casillas.
      </p>

      <div className="ttt-scoreboard">
        <div>
          <span>Jugador X</span>
          <strong>{scores.X}</strong>
        </div>

        <div>
          <span>Empates</span>
          <strong>{scores.draws}</strong>
        </div>

        <div>
          <span>Jugador O</span>
          <strong>{scores.O}</strong>
        </div>
      </div>

      <div className="ttt-status" aria-live="polite">
        {winner
          ? `¡Ganó el jugador ${winner}!`
          : isDraw
            ? "¡La partida terminó en empate!"
            : `Turno del jugador ${currentPlayer}`}
      </div>

      <div className="ttt-board">
        {board.map((value, index) => (
          <button
            key={index}
            type="button"
            className={`ttt-cell ${value || ""}`}
            onClick={() => handleClick(index)}
            disabled={Boolean(value) || Boolean(winner) || isDraw}
            aria-label={`Casilla ${index + 1}: ${value || "vacía"}`}
          >
            {value}
          </button>
        ))}
      </div>

      <div className="ttt-actions">
        <button onClick={restartGame}>
          Nueva partida
        </button>

        <button onClick={resetScores}>
          Reiniciar marcador
        </button>
      </div>
    </div>
  );
}

export default TicTacToe;
