import React, { useState } from "react";

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  // Yutish kombinatsiyalari
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // G'olibni tekshirish
  const checkWinner = () => {
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }
    if (!board.includes(null)) {
      setWinner("Draw");
    }
  };

  const handleCellClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
    checkWinner();
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsXNext(true);
  };

  // Inline CSS Styles
  const styles = {
    body: {
      backgroundColor: "#121212",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      color: "white",
      fontFamily: "Arial, sans-serif",
      margin: 0,
    },
    container: {
      textAlign: "center",
      backgroundColor: "#333",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 0 15px rgba(255, 255, 255, 0.1)",
      width: "300px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "5px",
      marginBottom: "20px",
    },
    cell: {
      width: "80px",
      height: "80px",
      fontSize: "2rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#444",
      cursor: "pointer",
      border: "2px solid #fff",
      borderRadius: "10px",
    },
    cellHover: {
      backgroundColor: "#555",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#ff4757",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "1rem",
      marginTop: "10px",
    },
    buttonHover: {
      backgroundColor: "#e84118",
    },
    message: {
      fontSize: "1.2rem",
      marginTop: "20px",
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1>Tic-Tac-Toe</h1>
        <h3>Turn: {isXNext ? "X" : "O"}</h3>
        <div style={styles.grid}>
          {board.map((cell, index) => (
            <div
              key={index}
              style={styles.cell}
              onClick={() => handleCellClick(index)}
            >
              {cell}
            </div>
          ))}
        </div>
        <p style={styles.message}>
          {winner ? (winner === "Draw" ? "It's a Draw!" : `Winner: ${winner}`) : ""}
        </p>
        <button
          style={styles.button}
          onClick={restartGame}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        >
          Restart Game
        </button>
      </div>
    </div>
  );
};

export default App;
