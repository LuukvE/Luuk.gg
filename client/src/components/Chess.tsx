import './Chess.scss';
import React, { FC, useCallback, useRef, useEffect, useMemo, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { Square } from '../types';
import { useSelector, useDispatch, actions } from '../store';

const engineURL = `${process.env.REACT_APP_BUCKET_URL}`;

const Chess: FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const engine = useRef<HTMLIFrameElement | null>(null);
  const boardElement = useRef<HTMLDivElement | null>(null);
  const {
    fen,
    turn,
    rows,
    pieces,
    rotated,
    squares,
    columns,
    dragging,
    userColor,
    latestMove,
    legalMoves,
    gameNumber,
    requestPromotion,
    availableSquares
  } = useSelector((state) => state.chess);

  const drag = useRef<null | {
    square: Square;
    element: any;
    startX: number;
    startY: number;
    relativeX: number;
    relativeY: number;
  }>(null);

  const getOffset = useCallback((elem: HTMLElement) => {
    const box = elem.getBoundingClientRect();
    const body = document.body;
    const docEl = document.documentElement;
    const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
    const clientTop = docEl.clientTop || body.clientTop || 0;
    const clientLeft = docEl.clientLeft || body.clientLeft || 0;
    const top = box.top + scrollTop - clientTop;
    const left = box.left + scrollLeft - clientLeft;

    return { left: Math.round(left), top: Math.round(top) };
  }, []);

  const move = useCallback(
    (e: any) => {
      const touch = e as TouchEvent;
      const mouse = e as MouseEvent;
      const { pageX, pageY } = touch.changedTouches ? touch.changedTouches[0] : mouse;

      if (!drag.current?.element) return e;

      drag.current.relativeY = (pageY - drag.current.startY) * (rotated ? -1 : 1);
      drag.current.relativeX = (pageX - drag.current.startX) * (rotated ? -1 : 1);
      drag.current.element.style.top = `${drag.current.relativeY}px`;
      drag.current.element.style.left = `${drag.current.relativeX}px`;
    },
    [drag, rotated]
  );

  const end = useCallback(async () => {
    if (!drag.current || !boardElement.current) return;

    const index = pieces.findIndex(
      (piece) => !piece.taken && piece === drag.current?.square?.piece
    );

    const piece = pieces[index];

    if (!piece) return;

    const squareSize = Math.round(boardElement.current.clientWidth / 8);
    const edgeToCenter = Math.round(boardElement.current.clientWidth / 16);
    const left = (drag.current.relativeX - edgeToCenter) / squareSize;
    const top = (drag.current.relativeY + edgeToCenter / 1.2) / squareSize;
    const newColumnIndex = columns.indexOf(piece.column) + Math.ceil(left);
    const newRowIndex = rows.indexOf(piece.row) + Math.floor(top);
    const row = rows[newRowIndex < 0 ? 0 : newRowIndex > 8 ? 8 : newRowIndex];
    const column = columns[newColumnIndex < 0 ? 0 : newColumnIndex > 8 ? 8 : newColumnIndex];

    // Only submit valid moves to the reducer
    if (availableSquares.includes(`${column}${row}`)) {
      dispatch(actions.chessMove(`${piece.column}${piece.row}${column}${row}`));
    }

    drag.current.element.removeAttribute('style');

    drag.current = null;

    setTimeout(() => {
      dispatch(
        actions.setChess({
          dragging: null
        })
      );
    }, 100);
  }, [columns, rows, pieces, availableSquares, dispatch]);

  useEffect(() => {
    document.body.removeEventListener('touchmove', move);
    document.body.removeEventListener('mousemove', move);
    document.body.removeEventListener('touchend', end);
    document.body.removeEventListener('mouseup', end);
    document.body.addEventListener('touchmove', move);
    document.body.addEventListener('mousemove', move);
    document.body.addEventListener('touchend', end);
    document.body.addEventListener('mouseup', end);

    return () => {
      document.body.removeEventListener('touchmove', move);
      document.body.removeEventListener('mousemove', move);
      document.body.removeEventListener('touchend', end);
      document.body.removeEventListener('mouseup', end);
    };
  }, [end, move]);

  useEffect(() => {
    setLoading(true);

    if (engine.current) {
      document.body.removeChild(engine.current);

      engine.current = null;
    }

    let timeout: number = 0;

    const iframe = document.createElement('iframe');

    document.body.appendChild(iframe);

    iframe.src = `${engineURL}/luuk.gg/stockfish.html`;

    iframe.onload = () => {
      engine.current = iframe;

      const stockfish = engine.current?.contentWindow;

      if (!stockfish) return;

      dispatch(actions.startChess());

      stockfish.postMessage('uci', engineURL);

      window.addEventListener('message', (event) => {
        if (event.source !== stockfish || !event.data) return;

        const message: string = event.data;

        const cmds: string[] = [];

        if (message === 'uciok') cmds.push('isready');

        if (message === 'readyok') {
          cmds.push('ucinewgame');

          if (['none', 'b'].includes(userColor)) cmds.push('position startpos', 'go');
          else cmds.push('position startpos', 'd');
        }

        if (message.indexOf('bestmove ') === 0) {
          setLoading(false);

          timeout = window.setTimeout(() => {
            dispatch(actions.chessMove(message.split(' ')[1]));
          }, 200);
        }

        if (message.indexOf('Checkers: ') === 0) {
          dispatch(
            actions.setChess({
              checkers: message.substring(9).trim().split(' ')
            })
          );
        }

        if (message.indexOf('Legal uci moves:') === 0) {
          dispatch(
            actions.setChess({
              legalMoves: message.substring(16).trim().split(' ')
            })
          );

          setLoading(false);
        }

        cmds.forEach((cmd) => stockfish.postMessage(cmd, engineURL));
      });
    };

    return () => {
      if (timeout) window.clearTimeout(timeout);
    };
  }, [dispatch, userColor, gameNumber]);

  useEffect(() => {
    if (requestPromotion || !latestMove || latestMove === '(none)') return;

    const stockfish = engine.current?.contentWindow;
    console.log('fen', fen);
    stockfish?.postMessage(`position ${fen}`, engineURL);

    if ([turn, 'both'].includes(userColor)) {
      stockfish?.postMessage('d', engineURL);
    } else {
      stockfish?.postMessage('go', engineURL);
    }
  }, [fen, latestMove, requestPromotion, turn, userColor]);

  // Start the game
  useEffect(() => {
    if (!pieces.length || squares.length) return;

    dispatch(
      actions.setChess({
        squares: pieces.reduce((squares: Square[], piece) => {
          if (piece.taken) return squares;

          const index = rows.indexOf(piece.row) * 8 + columns.indexOf(piece.column);

          squares[index] = { piece, index };

          return squares;
        }, new Array(64).fill(null))
      })
    );
  }, [squares, rows, columns, pieces, dispatch]);

  const squareNodes = useMemo(
    () =>
      squares.map((square, index) => {
        const squareRowIndex = Math.floor(index / 8);
        const squareColumnIndex = index % 8;
        const coordinate = `${columns[squareColumnIndex]}${rows[squareRowIndex]}`;

        const start = (e: any) => {
          if (drag.current) return e;

          if (!square?.piece) return e;

          if (square.piece.color !== turn) return e;

          if (![turn, 'both'].includes(userColor)) return e;

          dispatch(actions.setAvailableSquares(`${square.piece.column}${square.piece.row}`));

          const touch = e as TouchEvent;
          const mouse = e as MouseEvent;
          const { target } = touch.changedTouches ? touch.changedTouches[0] : mouse;
          const element =
            boardElement.current?.querySelector(`.square-${square.index} span`) || null;

          if (!element || !target || !boardElement.current) return;

          const edgeToCenter = Math.round(boardElement.current.clientWidth / 16);
          const { left, top } = getOffset(target as HTMLDivElement);

          drag.current = {
            square,
            element,
            startX: left + edgeToCenter,
            startY: top + edgeToCenter / 1.2,
            relativeX: 0,
            relativeY: 0
          };

          dispatch(
            actions.setChess({
              dragging: square.piece
            })
          );

          move(e);
        };

        return (
          <div
            onTouchStart={start}
            onMouseDown={start}
            className={`board-square${square && square.piece ? ' has-piece' : ''}${
              square && square.piece.color === turn && [turn, 'both'].includes(userColor)
                ? ' moveable'
                : ''
            }${availableSquares.includes(coordinate) ? ' available' : ''}`}
            key={index}
          ></div>
        );
      }),
    [availableSquares, columns, rows, squares, turn, drag, userColor, dispatch, getOffset, move]
  );

  const pieceNodes = useMemo(
    () =>
      pieces.map((piece, index) => {
        let left = columns.indexOf(piece.column) * 12.5;
        let top = rows.indexOf(piece.row) * 12.5;

        if (requestPromotion && latestMove.indexOf(`${piece.column}${piece.row}`) === 0) {
          left = columns.indexOf(latestMove[2]) * 12.5;
          top = rows.indexOf(latestMove[3]) * 12.5;
        }

        return (
          <div
            key={index}
            style={{
              left: `${left}%`,
              top: `${top}%`
            }}
            className={`piece ${piece.name}${piece.taken ? ' taken' : ''} square-${
              rows.indexOf(piece.row) * 8 + columns.indexOf(piece.column)
            } ${
              dragging?.row === piece.row && dragging?.column === piece.column ? ' dragging' : ''
            }`}
          >
            <span />
          </div>
        );
      }),
    [columns, rows, dragging, pieces, latestMove, requestPromotion]
  );

  return (
    <div className="Chess">
      {loading && (
        <div className="board loading">
          <Spinner animation="border" />
        </div>
      )}
      {!loading && (
        <div
          ref={boardElement}
          className={`board${rotated ? ' rotated' : ''}${dragging ? ' dragging' : ''}`}
        >
          {squareNodes}
          {pieceNodes}
          <div className="horizontal-labels">
            {columns.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
          <div className="vertical-labels">
            {rows.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>

          <div className={`request-promotion ${requestPromotion ? ` show ${turn}` : ''}`}>
            <div
              className={`piece ${turn === 'b' ? 'q' : 'Q'}`}
              onClick={() => {
                dispatch(actions.chessMove(`${latestMove}q`));
              }}
            >
              <span />
            </div>
            <div
              className={`piece ${turn === 'b' ? 'r' : 'R'}`}
              onClick={() => {
                dispatch(actions.chessMove(`${latestMove}r`));
              }}
            >
              <span />
            </div>
            <div
              className={`piece ${turn === 'b' ? 'b' : 'B'}`}
              onClick={() => {
                dispatch(actions.chessMove(`${latestMove}b`));
              }}
            >
              <span />
            </div>
            <div
              className={`piece ${turn === 'b' ? 'n' : 'N'}`}
              onClick={() => {
                dispatch(actions.chessMove(`${latestMove}n`));
              }}
            >
              <span />
            </div>
          </div>
        </div>
      )}
      <div className="chess-controls">
        <Button
          block
          variant="dark"
          size="lg"
          className={userColor === 'none' ? 'active' : ''}
          onClick={() => {
            dispatch(
              actions.setChess({
                gameNumber: gameNumber + 1,
                userColor: 'none'
              })
            );
          }}
        >
          <i className="fas fa-laptop-code" /> vs <i className="fas fa-laptop-code" />
        </Button>
        <Button
          block
          variant="dark"
          size="lg"
          className={userColor === 'both' ? 'active' : ''}
          onClick={() => {
            dispatch(
              actions.setChess({
                gameNumber: gameNumber + 1,
                userColor: 'both'
              })
            );
          }}
        >
          <i className="fas fa-user" /> vs <i className="fas fa-user" />
        </Button>
        <Button
          block
          variant="dark"
          size="lg"
          className={userColor === 'w' ? 'active' : ''}
          onClick={() => {
            dispatch(
              actions.setChess({
                gameNumber: gameNumber + 1,
                userColor: 'w'
              })
            );
          }}
        >
          <i className="fas fa-user" /> vs <i className="fas fa-laptop-code" />
        </Button>
        <Button
          block
          variant="dark"
          size="lg"
          className={userColor === 'b' ? 'active' : ''}
          onClick={() => {
            dispatch(
              actions.setChess({
                gameNumber: gameNumber + 1,
                userColor: 'b'
              })
            );
          }}
        >
          <i className="fas fa-laptop-code" /> vs <i className="fas fa-user" />
        </Button>
        {!loading &&
          (latestMove === '(none)' ||
            (legalMoves.length === 0 && ['both', turn].includes(userColor))) && (
            <>
              <h5>Check Mate</h5>
              <h3>{turn === 'w' ? 'Black' : 'White'} won!</h3>
            </>
          )}

        <Button
          size="sm"
          variant="dark"
          className="rotate-btn"
          onClick={() => {
            dispatch(actions.setChess({ rotated: !rotated }));
          }}
        >
          <i className="fas fa-sync" /> Rotate board
        </Button>
      </div>
    </div>
  );
};

export default Chess;
