import React from 'react';
import { io } from 'socket.io-client';

const socket = io(
  process.env.NODE_ENV === 'development' ? 'ws://localhost:8000/game' : '/game'
);

export const SocketContext = React.createContext({
  socket,
});

export const SocketProvider: React.FC = ({ children }) => {
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
