import { useRef, useEffect, useState, useCallback } from 'react';

import { useDispatch, actions } from '../store';

const useSocket = () => {
  const socket = useRef<WebSocket | null>(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const dev = process.env.NODE_ENV === 'development';
  const apiURL = dev ? process.env.REACT_APP_API_URL_DEV : process.env.REACT_APP_API_URL_PROD;
  const socketURL = `${apiURL}`.replace('http://', 'ws://').replace('https://', 'wss://');

  socket.current = socket.current || new WebSocket(socketURL);

  const send = useCallback((text: string) => {
    if (socket.current?.readyState !== socket.current?.OPEN) return;

    socket.current?.send(JSON.stringify({ text }));
  }, []);

  useEffect(() => {
    socket.current?.addEventListener('open', function (event) {
      setLoading(false);
    });

    socket.current?.addEventListener('message', function (event) {
      dispatch(actions.addMessage(JSON.parse(event.data)));
    });
  }, [dispatch]);

  return {
    loading,
    send
  };
};

export default useSocket;
