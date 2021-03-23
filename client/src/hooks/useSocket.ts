import { useEffect, useState, useCallback, MutableRefObject, useRef } from 'react';

import { useDispatch, actions } from '../store';

const useSocket = (socket: MutableRefObject<WebSocket | null>) => {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(0);
  const mounted = useRef(true);
  const [loading, setLoading] = useState(
    !socket.current || socket.current.readyState !== socket.current.OPEN
  );
  const dev = process.env.NODE_ENV === 'development';
  const apiURL = dev ? process.env.REACT_APP_API_URL_DEV : process.env.REACT_APP_API_URL_PROD;
  const socketURL = `${apiURL}`.replace('http://', 'ws://').replace('https://', 'wss://');

  socket.current = socket.current || new WebSocket(socketURL);

  const send = useCallback(
    (text: string) => {
      if (socket.current?.readyState !== socket.current?.OPEN) return;

      socket.current?.send(JSON.stringify({ text }));
    },
    [socket]
  );

  useEffect(() => {
    mounted.current = true;

    send('- User arrived on the page -');

    socket.current?.addEventListener('close', () => setRefresh(refresh + 1));

    socket.current?.addEventListener('error', () => setRefresh(refresh + 1));

    socket.current?.addEventListener('open', function (event) {
      if (!mounted.current) return;

      setLoading(false);

      send('- User arrived on the page -');
    });

    socket.current?.addEventListener('message', function (event) {
      if (!mounted.current) return;

      const message = JSON.parse(event.data);

      if (typeof message.online === 'boolean') {
        return dispatch(actions.setOnline(message.online));
      }

      if (['- User arrived on the page -', '- User left the page -'].includes(message.text)) return;

      dispatch(actions.addMessage(message));
    });

    return () => {
      mounted.current = false;

      send('- User left the page -');
    };
  }, [socket, refresh, setRefresh, send, dispatch]);

  return {
    loading,
    send
  };
};

export default useSocket;
