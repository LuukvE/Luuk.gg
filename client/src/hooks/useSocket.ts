import { useEffect, useState, useCallback, useRef } from 'react';

import { useDispatch, actions, useSelector } from '../store';

const apiURL =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_API_URL_DEV
    : process.env.REACT_APP_API_URL_PROD;

// Replace the HTTP protocol with the WebSocket protocol
const socketURL = `${apiURL}`.replace('http://', 'ws://').replace('https://', 'wss://');

const useSocket = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const socket = useRef<WebSocket>(new WebSocket(socketURL));
  const [loading, setLoading] = useState(true);

  // Sends a JSON message if the socket is open
  const send = useCallback(
    (text: string) => {
      if (socket.current?.readyState !== socket.current?.OPEN) return;

      socket.current?.send(
        JSON.stringify({
          text,
          name: user?.name || ''
        })
      );
    },
    [user, socket]
  );

  // Initialise the WebSocket
  useEffect(
    function init() {
      // If the socket opens
      socket.current?.addEventListener('open', () => {
        setLoading(false);
      });

      socket.current?.addEventListener('message', (event) => {
        const message = JSON.parse(event.data);

        console.log('received', message);

        // If the message contains a presence indicator update
        if (typeof message.online === 'boolean') {
          // Store the new presence indicator status
          return dispatch(actions.setOnline(message.online));
        }

        // Store the message
        dispatch(actions.addMessage(message));
      });

      // Create and initialise a new WebSocket on close
      socket.current?.addEventListener('close', () => {
        socket.current = new WebSocket(socketURL);
        init();
      });

      // Create and initialise a new WebSocket on error
      socket.current?.addEventListener('error', () => {
        socket.current = new WebSocket(socketURL);
        init();
      });
    },
    [socket, send, dispatch]
  );

  return {
    loading,
    send
  };
};

export default useSocket;
