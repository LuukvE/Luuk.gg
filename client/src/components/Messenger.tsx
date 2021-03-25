import './Messenger.scss';
import React, { FC, MutableRefObject, useState } from 'react';
import { parseJSON, format } from 'date-fns';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { useSelector } from '../store';
import useSocket from '../hooks/useSocket';

const Messenger: FC<{ socket: MutableRefObject<WebSocket | null> }> = ({ socket }) => {
  const { loading, send } = useSocket(socket);

  // State used while typing the message
  const [newMessage, setNewMessage] = useState('');

  // If messageCount is higher than the amount of messages in the store, show a loader
  const [messageCount, setMessageCount] = useState(0);
  const { messages, online } = useSelector((state) => state.slack);

  return (
    <div className="Messenger">
      <div className={`message luuk  ${online ? 'online' : 'offline'}`}>
        <img src="https://s3.eu-central-1.amazonaws.com/luuk.gg/luuk.jpg" alt="" />
        <p>
          You can write a message directly to my Slack app from this page. I am currently{' '}
          {online ? 'online' : 'offline'}. If I respond too slowly you can send me your email
          address and I can respond later.
        </p>
      </div>
      {messages.map((message, index) => (
        <div
          className={`message ${message.sender.toLowerCase()} ${online ? 'online' : 'offline'}`}
          key={index}
        >
          {message.sender === 'Luuk' && (
            <img src="https://s3.eu-central-1.amazonaws.com/luuk.gg/luuk.jpg" alt="" />
          )}
          {message.sender === 'You' && <small>{format(parseJSON(message.date), 'HH:mm')}</small>}
          <p>{message.text}</p>
          {message.sender === 'Luuk' && <small>{format(parseJSON(message.date), 'HH:mm')}</small>}
          {message.sender === 'You' && (
            <b className="user-icon">
              <i className="fas fa-user" />
            </b>
          )}
        </div>
      ))}
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (loading || !newMessage) return;

          send(newMessage);

          setNewMessage('');

          setMessageCount(messageCount + 1);
        }}
      >
        <Form.Control
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
          }}
        />
        <Button disabled={loading}>
          {messageCount > Object.keys(messages).length ? (
            <Spinner animation="border" />
          ) : (
            <span>
              <i className="fas fa-paper-plane" />
            </span>
          )}
        </Button>
      </form>
    </div>
  );
};

export default Messenger;
