import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import CustomLoader from '../components/CustomLoader/CustomLoader';
import PickButton from '../components/PickButton/PickButton';
import Result from '../components/Result/Result';
import { GameContext } from '../providers/GameProvider';
import { SocketContext } from '../providers/SocketProvider';
import { Game } from '../types/game';
import { Pick } from '../types/pick';
import { isPlayerWinner } from '../utils/isPlayerWinner';
import { PicksWrapper } from './GamePage.styles';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { WsError } from '../types/ws-error';
const MySwal = withReactContent(Swal);

const GamePage = () => {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [playerPick, setPlayerPick] = useState<Pick | null>(null);
  const [enemyPick, setEnemyPick] = useState<Pick | null>(null);
  useState<boolean>(false);

  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);
  const { id: gameId } = useParams();
  const { clientId, setEnemyScore, setPlayerScore } = useContext(GameContext);

  const handleOnPick = useCallback(
    (game: Game) => {
      const player = game.clients.find((client) => client.id === clientId);
      const enemy = game.clients.find((client) => client.id !== clientId);
      setPlayerScore(player?.score ?? 0);
      setEnemyScore(enemy?.score ?? 0);
      setPlayerPick(player?.pick ?? null);
      setEnemyPick(enemy?.pick ?? null);
    },
    [clientId, setEnemyScore, setPlayerScore]
  );

  const handleOnJoin = useCallback(
    (game: Game) => {
      console.log(game);
      const enemy = game.clients.find((client) => client.id !== clientId);
      if (enemy) {
        setGameStarted(true);
      }
    },
    [clientId]
  );

  const handleAgainAccepted = useCallback(() => {
    setPlayerPick(null);
    setEnemyPick(null);
  }, []);

  const handleJoinError = useCallback(
    async (error: WsError) => {
      await MySwal.fire({
        title: `Problem with joining the game`,
        allowEnterKey: true,
        confirmButtonText: 'OK',
        icon: 'error',
        text: error?.message,
      });
      navigate('/');
    },
    [navigate]
  );

  const handleGameAbort = useCallback(
    async (error: WsError) => {
      await MySwal.fire({
        title: `Game aborted`,
        allowEnterKey: true,
        confirmButtonText: 'OK',
        icon: 'info',
        text: error?.message,
      });
      setPlayerScore(0);
      setEnemyScore(0);
      navigate('/');
    },
    [navigate, setPlayerScore, setEnemyScore]
  );

  useEffect(() => {
    socket.emit('join', { clientId, gameId });

    socket.on('pick', handleOnPick);
    socket.on('join', handleOnJoin);
    socket.on('againAccept', handleAgainAccepted);
    socket.on('joinError', handleJoinError);
    socket.on('gameAborted', handleGameAbort);

    return () => {
      socket.off('pick', handleOnPick);
      socket.off('join', handleOnJoin);
      socket.off('againAccept', handleAgainAccepted);
      socket.off('joinError', handleJoinError);
      socket.off('gameAborted', handleGameAbort);
    };
    /*eslint-disable react-hooks/exhaustive-deps*/
  }, []);

  const handlePick = (pick: Pick) => {
    socket.emit('pick', { clientId, gameId, pick });
  };

  return (
    <>
      {gameStarted ? (
        <>
          {!playerPick ? (
            <PicksWrapper>
              <PickButton pickType="rock" onClick={() => handlePick('rock')} />
              <PickButton
                pickType="paper"
                onClick={() => handlePick('paper')}
              />
              <PickButton
                pickType="scissors"
                onClick={() => handlePick('scissors')}
              />
            </PicksWrapper>
          ) : (
            <>
              {enemyPick ? (
                <Result
                  playerPick={playerPick}
                  enemyPick={enemyPick}
                  playerWinned={isPlayerWinner(playerPick, enemyPick)}
                />
              ) : (
                <>
                  <PicksWrapper>
                    <PickButton pickType={playerPick} />
                  </PicksWrapper>
                </>
              )}
            </>
          )}
        </>
      ) : (
        <CustomLoader />
      )}
    </>
  );
};

export default GamePage;
