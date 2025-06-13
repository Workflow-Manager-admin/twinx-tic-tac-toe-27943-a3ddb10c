import React, { useState } from "react";

// PUBLIC_INTERFACE
/**
 * TwinX Tic Tac Toe Main Container.
 * - Shows a 3x3 game grid.
 * - Supports two players (X and O).
 * - Minimal, modern, light-themed UI using project palette.
 * @returns {JSX.Element}
 */
function TicTacToe() {
  // Game state: board as array of 9 cells, X goes first.
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState("");
  const winner = calculateWinner(board);

  // Game Status label
  let gameStatus;
  if (winner) {
    gameStatus = winner === "draw"
      ? "It's a draw!"
      : `Winner: ${winner}`;
  } else {
    gameStatus = `Next Player: ${xIsNext ? "X" : "O"}`;
  }

  // Handle cell click
  const handleClick = (i) => {
    if (board[i] || winner) return; // Don't override if filled or won

    const boardCopy = board.slice();
    boardCopy[i] = xIsNext ? "X" : "O";
    setBoard(boardCopy);
    setXIsNext((prev) => !prev);

    const newWinner = calculateWinner(boardCopy);
    if (newWinner) {
      setStatus(newWinner === "draw" ? "It's a draw!" : `Winner: ${newWinner}`);
    }
  };

  // Reset the game
  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setStatus("");
  };

  // Colors
  const palette = {
    primary: "#4CAF50",
    secondary: "#FFC107",
    accent: "#2196F3"
  };
  // Minimal styling: override on grid and cells for palette
  const styles = {
    board: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 64px)",
      gridTemplateRows: "repeat(3, 64px)",
      gap: "8px",
      background: "#fff",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0 2px 12px 0 rgba(60,60,60,0.07)",
      justifyContent: "center",
      alignItems: "center",
      margin: "32px auto"
    },
    cell: {
      width: "64px",
      height: "64px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "2.5rem",
      fontWeight: "600",
      cursor: "pointer",
      border: `2px solid ${palette.primary}`,
      borderRadius: "10px",
      background: "#fafafa",
      transition: "background 0.2s, border-color 0.2s",
      color: "#222"
    },
    cellX: {
      color: palette.primary
    },
    cellO: {
      color: palette.accent
    },
    status: {
      margin: "18px 0 12px 0",
      fontSize: "1.2rem",
      fontWeight: "500",
      color: palette.primary,
      textAlign: "center"
    },
    resetBtn: {
      backgroundColor: palette.accent,
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      padding: "10px 24px",
      fontSize: "1rem",
      fontWeight: "500",
      cursor: "pointer",
      margin: "18px 0 0 0",
      transition: "background 0.15s"
    }
  };

  return (
    <div style={{ maxWidth: 360, margin: "40px auto", background: "#f9f9f9", borderRadius: 16, boxShadow: "0 1px 8px 0 rgba(60,60,60,0.09)", padding: 32 }}>
      <div style={styles.status}>{status || gameStatus}</div>
      <div style={styles.board}>
        {board.map((cell, i) => (
          <div
            key={i}
            style={{
              ...styles.cell,
              ...(cell === "X" ? styles.cellX : {}),
              ...(cell === "O" ? styles.cellO : {}),
              borderColor: cell
                ? cell === "X"
                  ? palette.primary
                  : palette.accent
                : palette.secondary
            }}
            onClick={() => handleClick(i)}
            aria-label={`cell-${i}`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (
                !board[i] &&
                !winner &&
                (e.key === "Enter" || e.key === " ")
              ) {
                handleClick(i);
              }
            }}
          >
            {cell}
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center" }}>
        {(winner || board.every(Boolean)) && (
          <button style={styles.resetBtn} onClick={handleReset}>
            Restart Game
          </button>
        )}
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
/**
 * Calculate the winner or "draw" for a tic-tac-toe grid.
 * @param {Array} squares
 * @returns {"X" | "O" | "draw" | null}
 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6]             // diags
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
  if (squares.every(cell => cell)) {
    return "draw";
  }
  return null;
}

export default TicTacToe;
