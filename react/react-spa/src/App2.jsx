import { useState } from "react";

/* ===== SQUARE ===== */
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

/* ===== BOARD ===== */
function Board({ squares, onPlay }) {
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(index) {
    if (squares[index] || calculateWinner(squares)) return;

    const nextSquares = [...squares];
    nextSquares[index] = xIsNext ? "X" : "O";

    onPlay(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);

  const status = winner
    ? "Győztes: " + winner
    : "Következő játékos: " + (xIsNext ? "X" : "O");

  return (
    <div>
      <p className="status">{status}</p>

      <div className="board">
        {squares.map((value, i) => (
          <Square
            key={i}
            value={value}
            onSquareClick={() => handleClick(i)}
          />
        ))}
      </div>
    </div>
  );
}

/* ===== APP ===== */
function App2() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handlePlay(nextSquares) {
    setSquares(nextSquares);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
  }

  return (
    <div>
      <h2>Tic-Tac-Toe</h2>

      <Board squares={squares} onPlay={handlePlay} />

      <button style={{ marginTop: "20px" }} onClick={resetGame}>
        Új játék
      </button>
    </div>
  );
}

/* ===== WINNER ===== */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }

  return null;
}

export default App2;