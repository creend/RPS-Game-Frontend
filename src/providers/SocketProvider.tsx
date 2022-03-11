import React from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8000/game');

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
