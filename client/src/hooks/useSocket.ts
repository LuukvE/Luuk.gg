import { useEffect, useState, useCallback, MutableRefObject, useRef } from 'react';

import { useDispatch, actions } from '../store';
import { userArrived, userLeft } from '../constants';

const apiURL =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_API_URL_DEV
    : process.env.REACT_APP_API_URL_PROD;

const useSocket = (socket: MutableRefObject<WebSocket | null>) => {
  const dispatch = useDispatch();

  // Keep track on whether this current instance of useSocket is still used by components on the page
  const mounted = useRef(true);

  // Check if the referenced socket was already connected before or not
  const [loading, setLoading] = useState(
    !socket.current || socket.current.readyState !== socket.current.OPEN
  );

  // Replace the HTTP protocol with the WebSocket protocol
  const socketURL = `${apiURL}`.replace('http://', 'ws://').replace('https://', 'wss://');

  // If there was no referenced socket yet, create one
  socket.current = socket.current || new WebSocket(socketURL);

  // Sends a JSON message if the socket is open
  const send = useCallback(
    (text: string) => {
      if (socket.current?.readyState !== socket.current?.OPEN) return;

      socket.current?.send(JSON.stringify({ text }));
    },
    [socket]
  );

  // Initialise the WebSocket
  useEffect(() => {
    // If socket was already open, send a user arrived message to Slack
    if (socket.current?.readyState === socket.current?.OPEN) send(userArrived);

    // If the socket opens
    socket.current?.addEventListener('open', () => {
      // If this useSocket instance is no longer on the page, don't respond to the socket opening
      if (!mounted.current) return;

      setLoading(false);

      // Send a user arrived message to Slack
      send(userArrived);
    });

    socket.current?.addEventListener('message', (event) => {
      // If this useSocket instance is no longer on the page, don't respond to the new messages
      if (!mounted.current) return;

      const message = JSON.parse(event.data);

      // If the message contains a presence indicator update
      if (typeof message.online === 'boolean') {
        // Store the new presence indicator status
        return dispatch(actions.setOnline(message.online));
      }

      // Don't store chat messages that are identical to the "user arrived / left" message
      if ([userArrived, userLeft].includes(message.text)) return;

      // Store the message
      dispatch(actions.addMessage(message));
    });

    // Clear the referenced WebSocket on close or error
    socket.current?.addEventListener('close', () => (socket.current = null));

    socket.current?.addEventListener('error', () => (socket.current = null));

    return () => {
      // This useSocket instance is no longer used by a component on the page
      mounted.current = false;

      // Send a user left message to Slack
      send(userLeft);
    };
  }, [socket, send, dispatch]);

  return {
    loading,
    send
  };
};

export default useSocket;
