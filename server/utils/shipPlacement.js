const BOARD_SIZE = 10;
const SHIP_LENGTHS = [5,4,3,3,2];

function placeShipsRandomly() {
  // Create an empty chessboard
  const board = Array.from({ length: BOARD_SIZE }, () =>
      Array.from({ length: BOARD_SIZE }, () => ({
        hit: false,
        miss: false,
        ship: false,
        shipId: null
      }))
  );
  const ships = [];

  SHIP_LENGTHS.forEach((length, shipIndex) => {
    let placed = false;
    while (!placed) {
      const orientation = Math.random() < 0.5 ? 'H' : 'V';
      const row = Math.floor(Math.random() * BOARD_SIZE);
      const col = Math.floor(Math.random() * BOARD_SIZE);
      // Boundary judgment
      if ((orientation === 'H' && col + length > BOARD_SIZE) ||
          (orientation === 'V' && row + length > BOARD_SIZE)) continue;

      // Check overlap
      let overlap = false;
      for (let i = 0; i < length; i++) {
        const r = orientation==='H' ? row : row + i;
        const c = orientation==='H' ? col + i : col;
        if (board[r][c].ship) { overlap = true; break; }
      }
      if (overlap) continue;

      // Place the ship
      const positions = [];
      for (let i = 0; i < length; i++) {
        const r = orientation==='H' ? row : row + i;
        const c = orientation==='H' ? col + i : col;
        board[r][c].ship = true;
        board[r][c].shipId = shipIndex;
        positions.push({ row: r, col: c, hit: false });
      }
      ships.push({ shipIndex, length, positions });
      placed = true;
    }
  });

  return { board, ships };
}

module.exports = { placeShipsRandomly };
