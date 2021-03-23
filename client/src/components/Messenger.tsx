import './Messenger.scss';
import React, { FC, useState } from 'react';
import { parseJSON, format } from 'date-fns';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { useSelector } from '../store';
import useSocket from '../hooks/useSocket';

const Messenger: FC = () => {
  const { loading, send } = useSocket();
  const [newMessage, setNewMessage] = useState('');
  const [messageCount, setMessageCount] = useState(0);
  const messages = useSelector((state) => state.messages);

  return (
    <div className="Messenger">
      <div className="message luuk">
        <img src="/luuk.jpg" alt="" />
        <p>
          You can write a message directly to my Slack app from this page. If I am online I can
          respond right away. If it takes too long, you can send me your email address and I can
          respond later.
        </p>
      </div>
      {messages.map((message, index) => (
        <div className={`message ${message.sender.toLowerCase()}`} key={index}>
          {message.sender === 'Luuk' && <img src="/luuk.jpg" alt="" />}
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
