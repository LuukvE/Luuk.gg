import './Chess.scss';
import React, { FC, useCallback, useRef, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { Square } from '../types';
import { useSelector, useDispatch, actions } from '../store';

const Chess: FC = () => {
  const dispatch = useDispatch();
  const engine = useRef<Worker | null>(null);
  const boardElement = useRef<HTMLDivElement | null>(null);
  const {
    turn,
    squares,
    fen,
    userColor,
    latestMove,
    pieces,
    dragging,
    rows,
    columns,
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

      drag.current.relativeY = pageY - drag.current.startY;
      drag.current.relativeX = pageX - drag.current.startX;
      drag.current.element.style.top = `${drag.current.relativeY}px`;
      drag.current.element.style.left = `${drag.current.relativeX}px`;
    },
    [drag]
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

    dispatch(actions.chessMove(`${piece.column}${piece.row}${column}${row}`));

    drag.current.element.removeAttribute('style');

    drag.current = null;

    setTimeout(() => {
      dispatch(
        actions.setChess({
          dragging: null
        })
      );
    }, 100);
  }, [columns, rows, pieces, dispatch]);

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
    if (engine.current) engine.current.terminate();

    dispatch(actions.startChess());

    const stockfish = (engine.current = new Worker('/stockfish.js'));

    stockfish.postMessage('uci');

    stockfish.onmessage = (event) => {
      if (!event.data) return;

      const message = event.data;

      const cmds: string[] = [];

      if (message === 'uciok') cmds.push('isready');

      if (message === 'readyok') {
        cmds.push('ucinewgame');

        if (userColor !== 'w') cmds.push('position startpos', 'go');
      }

      if (message.indexOf('bestmove ') === 0) {
        // console.log(message);
        dispatch(actions.chessMove(message.split(' ')[1]));
      }

      cmds.forEach((cmd) => stockfish.postMessage(cmd));
    };
  }, [dispatch, userColor, gameNumber]);

  useEffect(() => {
    if (requestPromotion || !latestMove || latestMove === '(none)' || turn === userColor) return;

    setTimeout(() => {
      engine.current?.postMessage(`position ${fen}`);

      engine.current?.postMessage('go');
    }, 200);
  }, [fen, latestMove, requestPromotion, turn, userColor]);

  useEffect(() => {
    if (squares.length) return;

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

  return (
    <div className="Chess">
      <div ref={boardElement} className={`board${dragging ? ' dragging' : ''}`}>
        {squares.map((square, index) => {
          const squareRowIndex = Math.floor(index / 8);
          const squareColumnIndex = index % 8;
          const coordinate = `${columns[squareColumnIndex]}${rows[squareRowIndex]}`;

          const start = (e: any) => {
            if (!square?.piece) return e;

            if (square.piece.color !== turn) {
              return e;
            }

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
                square && square.piece.color === turn ? ' moveable' : ''
              }${availableSquares.includes(coordinate) ? ' available' : ''}`}
              key={index}
            ></div>
          );
        })}
        {pieces.map((piece, index) => {
          return (
            <div
              key={index}
              style={{
                left: `${columns.indexOf(piece.column) * 12.5}%`,
                top: `${rows.indexOf(piece.row) * 12.5}%`
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
        })}
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
      </div>
      <div className="chess-controls">
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
          <i className="fas fa-user" /> vs <i className="fas fa-laptop-code" />
        </Button>
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
          <i className="fas fa-laptop-code" /> vs <i className="fas fa-user" />
        </Button>
      </div>
      <Modal
        animation={false}
        className="modal"
        size="sm"
        show={requestPromotion}
        onHide={() => {}}
      >
        <Modal.Header>Promote to a...</Modal.Header>
        <Modal.Body>
          <Button
            onClick={() => {
              dispatch(actions.chessMove(`${latestMove}q`));
            }}
          >
            Queen
          </Button>
          <Button
            onClick={() => {
              dispatch(actions.chessMove(`${latestMove}r`));
            }}
          >
            Rook
          </Button>
          <Button
            onClick={() => {
              dispatch(actions.chessMove(`${latestMove}b`));
            }}
          >
            Bishop
          </Button>
          <Button
            onClick={() => {
              dispatch(actions.chessMove(`${latestMove}n`));
            }}
          >
            Knight
          </Button>
        </Modal.Body>
      </Modal>
      <Modal
        animation={false}
        className="modal"
        size="lg"
        show={latestMove === '(none)'}
        onHide={() => {
          dispatch(
            actions.setChess({
              latestMove: ''
            })
          );
        }}
      >
        <Modal.Header closeButton>Check Mate</Modal.Header>
        <Modal.Body>{turn === 'w' ? 'Black' : 'White'} won!</Modal.Body>
      </Modal>
    </div>
  );
};

export default Chess;
