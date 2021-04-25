import { useEffect, useState, useCallback, useRef } from 'react';

import { useDispatch, actions, useSelector } from '../store';

const apiURL = process.env.REACT_APP_API_URL;
console.log(apiURL);
// Replace the HTTP protocol with the WebSocket protocol
const socketURL = `${apiURL}`.replace('http://', 'ws://').replace('https://', 'wss://');

const useSocket = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const socket = useRef<WebSocket | null>();
  const [loading, setLoading] = useState(true);

  // Sends a JSON message
  const send = useCallback(
    (text: string) => {
      // If the socket is not open, try again in one second
      if (!socket.current || socket.current?.readyState !== socket.current?.OPEN) {
        setTimeout(send, 1000, text);
        return;
      }

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
      console.log(socketURL);
      const thisSocket = (socket.current = new WebSocket(socketURL));

      // If the socket opens
      socket.current?.addEventListener('open', () => {
        if (thisSocket !== socket.current) return;

        setLoading(false);
      });

      socket.current?.addEventListener('message', (event) => {
        if (thisSocket !== socket.current) return;

        const message = JSON.parse(event.data);

        // If the message contains a presence indicator update
        if (typeof message.online === 'boolean') {
          // Store the new presence indicator status
          return dispatch(actions.setOnline(message.online));
        }

        // When signed in, remove user name from the text
        if (user && message.sender === 'You') {
          message.text = message.text.replace(`${user.name}: `, '');
        }

        // Store the message
        dispatch(actions.addMessage(message));
      });

      // Create and initialise a new WebSocket on close
      socket.current?.addEventListener('close', () => {
        if (thisSocket !== socket.current) return;

        setTimeout(init, 1000);
      });

      // Create and initialise a new WebSocket on error
      socket.current?.addEventListener('error', () => {
        if (thisSocket !== socket.current) return;

        setTimeout(init, 1000);
      });
    },
    [socket, user, send, dispatch]
  );

  return {
    loading,
    send
  };
};

export default useSocket;
