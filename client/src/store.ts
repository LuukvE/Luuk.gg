import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux';
import { configureStore, getDefaultMiddleware, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

import { State, Square, searchSquare } from './types';
import { defaultRecipes } from './constants';

// Redux store starting state
const initialState: State = {
  error: '',
  user: null,
  slack: {
    online: false,
    messages: []
  },
  twilio: {
    token: ''
  },
  github: {
    totalContributions: 0,
    contributions: {}
  },
  cooking: {
    openId: null,
    editId: null,
    deleteId: null,
    recipes: defaultRecipes
  },
  chess: {
    gameNumber: 1,
    turn: 'w',
    userColor: 'none',
    latestMove: '',
    requestPromotion: false,
    availableSquares: [],
    fen: '',
    squares: [],
    dragging: null,
    pieces: [],
    columns: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    rows: ['8', '7', '6', '5', '4', '3', '2', '1'],
    enPassant: '-',
    halfMoveClock: 0,
    fullMoveNumber: 1,
    castling: 'KQkq'
  }
};

// Actions are generated from the methods inside the reducers property
export const { actions, reducer } = createSlice({
  name: 'store',
  initialState,
  reducers: {
    set: (state, action) => ({ ...state, ...action.payload }),
    addMessage: (state, action) => {
      state.slack.messages.push(action.payload);
    },
    setOnline: (state, action) => {
      state.slack.online = action.payload;
    },
    setCooking: (state, action) => {
      state.cooking = {
        ...state.cooking,
        ...action.payload
      };
    },
    updateRecipe: (state, action) => {
      const { cid, ...recipe } = action.payload;

      // Find index of recipe
      const index = state.cooking.recipes.findIndex((recipe) => recipe.cid === cid);

      const prev = state.cooking.recipes[index];

      state.cooking.recipes[index] = {
        ...prev,
        ...recipe
      };
    },
    addRecipe: (state) => {
      const cid = nanoid();

      state.cooking.editId = cid;

      state.cooking.recipes.unshift({
        cid,
        name: '',
        creator: state.user?.email || '',
        difficulty: 1,
        duration: '',
        image: '',
        text: `## Ingredients
- Love
- Sweat
- Tears

## Instructions
1. Put in hard work
2. Serve while warm`,
        created: new Date().toJSON()
      });
    },
    startChess: (state) => {
      state.chess = {
        ...initialState.chess,
        gameNumber: state.chess.gameNumber,
        userColor: state.chess.userColor,
        pieces: [
          { name: 'r', color: 'b', row: '8', column: 'a' },
          { name: 'n', color: 'b', row: '8', column: 'b' },
          { name: 'b', color: 'b', row: '8', column: 'c' },
          { name: 'q', color: 'b', row: '8', column: 'd' },
          { name: 'k', color: 'b', row: '8', column: 'e' },
          { name: 'b', color: 'b', row: '8', column: 'f' },
          { name: 'n', color: 'b', row: '8', column: 'g' },
          { name: 'r', color: 'b', row: '8', column: 'h' },
          { name: 'p', color: 'b', row: '7', column: 'a' },
          { name: 'p', color: 'b', row: '7', column: 'b' },
          { name: 'p', color: 'b', row: '7', column: 'c' },
          { name: 'p', color: 'b', row: '7', column: 'd' },
          { name: 'p', color: 'b', row: '7', column: 'e' },
          { name: 'p', color: 'b', row: '7', column: 'f' },
          { name: 'p', color: 'b', row: '7', column: 'g' },
          { name: 'p', color: 'b', row: '7', column: 'h' },
          { name: 'R', color: 'w', row: '1', column: 'a' },
          { name: 'N', color: 'w', row: '1', column: 'b' },
          { name: 'B', color: 'w', row: '1', column: 'c' },
          { name: 'Q', color: 'w', row: '1', column: 'd' },
          { name: 'K', color: 'w', row: '1', column: 'e' },
          { name: 'B', color: 'w', row: '1', column: 'f' },
          { name: 'N', color: 'w', row: '1', column: 'g' },
          { name: 'R', color: 'w', row: '1', column: 'h' },
          { name: 'P', color: 'w', row: '2', column: 'a' },
          { name: 'P', color: 'w', row: '2', column: 'b' },
          { name: 'P', color: 'w', row: '2', column: 'c' },
          { name: 'P', color: 'w', row: '2', column: 'd' },
          { name: 'P', color: 'w', row: '2', column: 'e' },
          { name: 'P', color: 'w', row: '2', column: 'f' },
          { name: 'P', color: 'w', row: '2', column: 'g' },
          { name: 'P', color: 'w', row: '2', column: 'h' }
        ]
      };
    },
    setChess: (state, action) => {
      state.chess = {
        ...state.chess,
        ...action.payload
      };
    },
    setAvailableSquares: (state, action) => {
      const c = state.chess;
      const [column, row] = action.payload.split('');
      const rowIndex = c.rows.indexOf(row);
      const columnIndex = c.columns.indexOf(column);
      const pieceSquareIndex = rowIndex * 8 + columnIndex;
      const piece = c.pieces.find(
        (piece) => !piece.taken && piece.column === column && piece.row === row
      );

      if (!piece) return;

      const king = c.pieces.find(
        (piece) => !piece.taken && piece.color === c.turn && ['k', 'K'].includes(piece.name)
      );

      if (!king) return;

      // If king is not the piece we are moving we need to check for the pin
      if (king !== piece) {
        let pinned = false;

        const kingRowIndex = c.rows.indexOf(king.row);
        const kingColumnIndex = c.columns.indexOf(king.column);

        // Check if the king and the currently selected piece are in the same direction
        // Starting at the selected piece, find the first opponent piece in that direction
        // If that opponent piece can move in the searched direction, you are pinned

        // Horizontal check
        if (rowIndex === kingRowIndex) {
          const pinner = search(
            pieceSquareIndex,
            `horizontal-${columnIndex > kingColumnIndex ? 'right' : 'left'}`
          ).pop()?.piece;
          pinned =
            !!pinner && pinner.color !== c.turn && ['r', 'R', 'q', 'Q'].includes(pinner.name);

          // Vertical check
        } else if (columnIndex === kingColumnIndex) {
          const pinner = search(
            pieceSquareIndex,
            `vertical-${rowIndex > kingRowIndex ? 'down' : 'up'}`
          ).pop()?.piece;
          pinned =
            !!pinner && pinner.color !== c.turn && ['r', 'R', 'q', 'Q'].includes(pinner.name);

          // Diagonal check left-down / right-up
        } else if ((rowIndex - kingRowIndex) / (columnIndex - kingColumnIndex) === -1) {
          const pinner = search(
            pieceSquareIndex,
            `diagonal-${rowIndex > kingRowIndex ? 'right-up' : 'left-down'}`
          ).pop()?.piece;
          pinned =
            !!pinner && pinner.color !== c.turn && ['b', 'B', 'q', 'Q'].includes(pinner.name);

          // Diagonal check left-up / right-down
        } else if ((rowIndex - kingRowIndex) / (columnIndex - kingColumnIndex) === 1) {
          const pinner = search(
            pieceSquareIndex,
            `diagonal-${rowIndex > kingRowIndex ? 'right-down' : 'left-up'}`
          ).pop()?.piece;
          pinned =
            !!pinner && pinner.color !== c.turn && ['b', 'B', 'q', 'Q'].includes(pinner.name);
        }

        if (pinned) {
          c.availableSquares = [];
          return;
        }
      }

      const lines: { [direction: string]: searchSquare[] } = {};

      if (['n', 'N'].includes(piece.name)) {
        lines.all = [10, 17, 15, 6, -10, -17, -15, -6].reduce(
          (searchSquares: searchSquare[], delta) => {
            if ([6, -10].includes(delta) && pieceSquareIndex % 8 < 2) return searchSquares;
            if ([15, -17].includes(delta) && pieceSquareIndex % 8 === 0) return searchSquares;
            if ([-6, 10].includes(delta) && pieceSquareIndex % 8 > 5) return searchSquares;
            if ([-15, 17].includes(delta) && pieceSquareIndex % 8 === 7) return searchSquares;

            const nextIndex = pieceSquareIndex + delta;
            const square = state.chess.squares[nextIndex];
            const rowIndex = Math.floor(nextIndex / 8);
            const columnIndex = nextIndex % 8;
            const row = c.rows[rowIndex];
            const column = c.columns[columnIndex];

            if (!row || !column) return searchSquares;

            const coordinate = `${column}${row}`;

            searchSquares.push({
              coordinate,
              piece: square?.piece || null
            });

            return searchSquares;
          },
          []
        );
      }

      if (['P', 'k', 'K', 'r', 'R', 'q', 'Q'].includes(piece.name)) {
        lines.vertical_up = search(pieceSquareIndex, 'vertical_up');
      }

      if (['p', 'k', 'K', 'r', 'R', 'q', 'Q'].includes(piece.name)) {
        lines.vertical_down = search(pieceSquareIndex, 'vertical_down');
      }

      if (['k', 'K', 'r', 'R', 'q', 'Q'].includes(piece.name)) {
        lines.horizontal_left = search(pieceSquareIndex, 'horizontal_left');
        lines.horizontal_right = search(pieceSquareIndex, 'horizontal_right');
      }

      if (['P', 'k', 'K', 'b', 'B', 'q', 'Q'].includes(piece.name)) {
        lines.diagonal_left_up = search(pieceSquareIndex, 'diagonal_left_up');
        lines.diagonal_right_up = search(pieceSquareIndex, 'diagonal_right_up');
      }

      if (['p', 'k', 'K', 'b', 'B', 'q', 'Q'].includes(piece.name)) {
        lines.diagonal_left_down = search(pieceSquareIndex, 'diagonal_left_down');
        lines.diagonal_right_down = search(pieceSquareIndex, 'diagonal_right_down');
      }

      c.availableSquares = Object.keys(lines).reduce(
        (available: string[], direction) =>
          lines[direction].reduce((available, square, index) => {
            if (square?.piece?.color === c.turn) return available;

            // Pawns can only move diagonally if there is an opponent piece or en passant
            if (
              ['P', 'p'].includes(piece.name) &&
              direction.includes('diagonal') &&
              !square.piece &&
              c.enPassant !== square.coordinate
            )
              return available;

            if (
              rowIndex === 6 &&
              piece.name === 'P' &&
              direction === 'vertical_up' &&
              index === 1 &&
              !square.piece
            ) {
              available.push(square.coordinate);
            }

            if (
              rowIndex === 1 &&
              piece.name === 'p' &&
              direction === 'vertical_down' &&
              index === 1 &&
              !square.piece
            ) {
              available.push(square.coordinate);
            }

            if (['p', 'P', 'K', 'k'].includes(piece.name) && index > 0) return available;

            available.push(square.coordinate);

            return available;
          }, available),
        []
      );

      function search(
        index: number,
        direction: string,
        buffer: searchSquare[] = []
      ): searchSquare[] {
        let nextIndex: null | number = null;

        if (direction === 'horizontal_right') {
          nextIndex = index + 1;
          if (nextIndex % 8 === 0) return buffer;
        } else if (direction === 'horizontal_left') {
          if (index % 8 === 0) return buffer;
          nextIndex = index - 1;
        } else if (direction === 'vertical_up') {
          nextIndex = index - 8;
          if (nextIndex < 0) return buffer;
        } else if (direction === 'vertical_down') {
          nextIndex = index + 8;
          if (nextIndex > 64) return buffer;
        } else if (direction === 'diagonal_right_down') {
          nextIndex = index + 9;
          if (nextIndex > 64 || nextIndex % 8 === 0) return buffer;
        } else if (direction === 'diagonal_left_down') {
          nextIndex = index + 7;
          if (nextIndex > 64 || nextIndex % 8 === 7) return buffer;
        } else if (direction === 'diagonal_left_up') {
          if (index % 8 === 0) return buffer;
          nextIndex = index - 9;
          if (nextIndex < 0) return buffer;
        } else if (direction === 'diagonal_right_up') {
          if (index % 8 === 7) return buffer;
          nextIndex = index - 7;
          if (nextIndex < 0) return buffer;
        }

        if (nextIndex === null) return buffer;

        const square = state.chess.squares[nextIndex];
        const rowIndex = Math.floor(nextIndex / 8);
        const columnIndex = nextIndex % 8;
        const row = c.rows[rowIndex];
        const column = c.columns[columnIndex];
        const coordinate = `${column}${row}`;

        buffer.push({
          coordinate,
          piece: square?.piece || null
        });

        if (!square?.piece) return search(nextIndex, direction, buffer);

        return buffer;
      }
    },
    chessMove: (state, action) => {
      const c = state.chess;

      c.latestMove = action.payload;

      if (c.latestMove === '(none)') return;

      // Find moved piece
      const [originalColumn, originalRow, newColumn, newRow, promotion] = action.payload.slice('');

      const originalPiece = c.pieces.find(
        (piece) => !piece.taken && piece.column === originalColumn && piece.row === originalRow
      );

      if (!originalPiece) return console.log('error making move', action.payload);

      // Disallow invalid square
      if (
        !promotion &&
        c.turn === c.userColor &&
        !c.availableSquares.includes(`${newColumn}${newRow}`)
      ) {
        return;
      }

      c.availableSquares = [];

      // Move and attack
      const attackedPiece = c.pieces.find(
        (piece) => !piece.taken && piece.column === newColumn && piece.row === newRow
      );

      if (attackedPiece) attackedPiece.taken = true;

      // Remove any attacked en passant squares
      if (['P', 'p'].includes(originalPiece.name) && `${newColumn}${newRow}` === c.enPassant) {
        const removedPawn = c.pieces.find(
          (piece) =>
            !piece.taken &&
            piece.column === newColumn &&
            piece.row === `${parseInt(newRow, 10) + (originalPiece.name === 'P' ? 1 : -1)}`
        );

        if (removedPawn) removedPawn.taken = true;
      }

      // Calculate en passant square
      const originalRowIndex = c.rows.indexOf(originalPiece.row);
      const newRowIndex = c.rows.indexOf(newRow);

      c.enPassant = '-';

      if (originalPiece.name === 'P' && originalRowIndex - newRowIndex === 2) {
        c.enPassant = newColumn + (parseInt(originalPiece.row, 10) + 1);
      }

      if (originalPiece.name === 'p' && originalRowIndex - newRowIndex === -2) {
        c.enPassant = newColumn + (parseInt(originalPiece.row, 10) - 1);
      }

      // Castling
      if (originalPiece.name === 'R') {
        if (originalPiece.column === 'a') c.castling = c.castling.replace('Q', '');
        if (originalPiece.column === 'h') c.castling = c.castling.replace('K', '');
      }

      if (originalPiece.name === 'r') {
        if (originalPiece.column === 'a') c.castling = c.castling.replace('q', '');
        if (originalPiece.column === 'h') c.castling = c.castling.replace('k', '');
      }

      if (attackedPiece?.name === 'R') {
        if (attackedPiece.column === 'a') c.castling = c.castling.replace('Q', '');
        if (attackedPiece.column === 'h') c.castling = c.castling.replace('K', '');
      }

      if (attackedPiece?.name === 'r') {
        if (attackedPiece.column === 'a') c.castling = c.castling.replace('q', '');
        if (attackedPiece.column === 'h') c.castling = c.castling.replace('k', '');
      }

      if (originalPiece.name === 'K') {
        c.castling = c.castling.replace('Q', '');
        c.castling = c.castling.replace('K', '');

        if (originalPiece.column === 'e') {
          if (newColumn === 'g') {
            const rook = c.pieces.find(
              (piece) =>
                !piece.taken && piece.name === 'R' && piece.column === 'h' && piece.row === '1'
            );

            if (rook) rook.column = 'f';
          } else if (newColumn === 'c') {
            const rook = c.pieces.find(
              (piece) =>
                !piece.taken && piece.name === 'R' && piece.column === 'a' && piece.row === '1'
            );

            if (rook) rook.column = 'd';
          }
        }
      } else if (originalPiece.name === 'k') {
        c.castling = c.castling.replace('q', '');
        c.castling = c.castling.replace('k', '');

        if (originalPiece.column === 'e') {
          if (newColumn === 'g') {
            const rook = c.pieces.find(
              (piece) =>
                !piece.taken && piece.name === 'r' && piece.column === 'h' && piece.row === '8'
            );

            if (rook) rook.column = 'f';
          } else if (newColumn === 'c') {
            const rook = c.pieces.find(
              (piece) =>
                !piece.taken && piece.name === 'r' && piece.column === 'a' && piece.row === '8'
            );

            if (rook) rook.column = 'd';
          }
        }
      }

      // Promotion
      if (originalPiece.name === 'P' && newRow === '8') {
        if (!promotion) {
          c.requestPromotion = true;
          return;
        }

        originalPiece.name = promotion.toUpperCase();

        c.requestPromotion = false;
      }

      if (originalPiece.name === 'p' && newRow === '1') {
        if (!promotion) {
          c.requestPromotion = true;
          return;
        }

        originalPiece.name = promotion;

        c.requestPromotion = false;
      }

      originalPiece.row = newRow;

      originalPiece.column = newColumn;

      // Configure next turn
      c.turn = c.turn === 'w' ? 'b' : 'w';

      if (c.turn === 'w') c.fullMoveNumber += 1;

      c.halfMoveClock = attackedPiece ? 0 : c.halfMoveClock + 1;

      // Recalculate squares
      c.squares = c.pieces.reduce((squares: Square[], piece) => {
        if (piece.taken) return squares;

        const index = c.rows.indexOf(piece.row) * 8 + c.columns.indexOf(piece.column);

        squares[index] = { piece, index };

        return squares;
      }, new Array(64).fill(null));

      // Generate FEN code
      const { fenPieces } = c.squares.reduce(
        (memo: { fenPieces: string; emptyCount: number }, square, index) => {
          if (index && index % 8 === 0) {
            if (memo.emptyCount) memo.fenPieces += memo.emptyCount;
            memo.emptyCount = 0;
            memo.fenPieces += '/';
          }

          if (!square) {
            memo.emptyCount += 1;
            return memo;
          }

          if (memo.emptyCount) memo.fenPieces += memo.emptyCount;

          memo.emptyCount = 0;

          memo.fenPieces += square.piece.name;

          return memo;
        },
        { fenPieces: '', emptyCount: 0 }
      );

      c.fen = `fen ${fenPieces} ${c.turn === 'w' ? 'w' : 'b'} ${c.castling || '-'} ${c.enPassant} ${
        c.halfMoveClock
      } ${c.fullMoveNumber}`;
    }
  }
});

const store = configureStore({
  reducer,
  devTools: true,
  middleware: getDefaultMiddleware()
});

export default store;

export { useDispatch } from 'react-redux';

// Export a typed version of the useSelector hook
export const useSelector: TypedUseSelectorHook<State> = useReduxSelector;
