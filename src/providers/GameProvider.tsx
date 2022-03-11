import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

export const GameContext = React.createContext({
  clientId: '',
  playerScore: 0,
  enemyScore: 0,
  setPlayerScore: (score: number) => {},
  setEnemyScore: (score: number) => {},
});

const clientId = uuid();

const GameProvider: React.FC = ({ children }) => {
  const [playerScore, setPScore] = useState(0);
  const [enemyScore, setEScore] = useState(0);

  return (
    <GameContext.Provider
      value={{
        clientId,
        playerScore,
        enemyScore,
        setPlayerScore: (score: number) => {
          setPScore(score);
        },
        setEnemyScore: (score: number) => {
          setEScore(score);
        },
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
