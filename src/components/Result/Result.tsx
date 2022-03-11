import { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { GameContext } from '../../providers/GameProvider';
import { SocketContext } from '../../providers/SocketProvider';
import { Pick } from '../../types/pick';
import PickButton from '../PickButton/PickButton';
import {
  ChoiceWrapper,
  PickerInfo,
  PlayAgainButton,
  ResultInfo,
  ResultWrapper,
  Wrapper,
} from './Result.style';

interface Props {
  playerPick: Pick;
  enemyPick: Pick;
  playerWinned: boolean | 'draw';
}

const Result: React.FC<Props> = ({ enemyPick, playerPick, playerWinned }) => {
  const [againRequestSent, setAgainRequestSent] = useState<boolean>(false);
  const [againRequestReceived, setAgainRequestReceived] =
    useState<boolean>(false);

  const { id: gameId } = useParams();
  const { clientId } = useContext(GameContext);
  const { socket } = useContext(SocketContext);

  const handleOnAgainRequestReceived = useCallback(() => {
    setAgainRequestReceived(true);
  }, []);

  const sendAgainRequest = () => {
    socket.emit('againRequest', { clientId, gameId });
    setAgainRequestSent(true);
  };

  const sendAgainAccept = () => {
    socket.emit('againAccept', { clientId, gameId });
  };

  useEffect(() => {
    socket.on('againRequest', handleOnAgainRequestReceived);
    return () => {
      socket.off('againRequest', handleOnAgainRequestReceived);
    };
  }, [socket, handleOnAgainRequestReceived]);

  const isAgainRequest = againRequestReceived || againRequestSent;
  const handleButtonClick = againRequestReceived
    ? sendAgainAccept
    : sendAgainRequest;

  return (
    <Wrapper>
      <ChoiceWrapper>
        <PickerInfo>You Picked</PickerInfo>
        <PickButton pickType={playerPick} />
      </ChoiceWrapper>
      <ResultWrapper>
        {playerWinned === 'draw' ? (
          <ResultInfo>DRAW</ResultInfo>
        ) : playerWinned ? (
          <ResultInfo>YOU WON</ResultInfo>
        ) : (
          <ResultInfo>YOU LOST</ResultInfo>
        )}
        <PlayAgainButton
          onClick={handleButtonClick}
          againRequest={isAgainRequest}
          type="button"
          aria-label="play-again"
        >
          Play Again
        </PlayAgainButton>
      </ResultWrapper>
      <ChoiceWrapper>
        <PickerInfo>Enemy Picked</PickerInfo>
        <PickButton pickType={enemyPick} />
      </ChoiceWrapper>
    </Wrapper>
  );
};

export default Result;
