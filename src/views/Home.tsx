import { useCallback, useContext, useEffect } from 'react';
import Button from '../components/Button/Button';
import { ButtonsWrapper } from './Home.styles';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../providers/GameProvider';
import { SocketContext } from '../providers/SocketProvider';
const MySwal = withReactContent(Swal);

const Home = () => {
  const navigate = useNavigate();
  const { clientId } = useContext(GameContext);
  const { socket } = useContext(SocketContext);

  const handleOnCreate = useCallback(
    async ({ id }) => {
      await MySwal.fire({
        title: `Utworzono gre o kodzie ${id}`,
        allowEnterKey: true,
        confirmButtonText: 'OK',
        icon: 'success',
      });
      navigate(`/game/${id}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on('create', handleOnCreate);
    return () => {
      socket.off('create', handleOnCreate);
    };
  }, [handleOnCreate, socket]);

  const handleCreateButtonClick = async () => {
    socket.emit('create', clientId);
  };

  const handleJoinButtonClick = async () => {
    const { value: gameCode } = await MySwal.fire({
      title: 'Wpisz kod gry',
      input: 'text',
      showCancelButton: true,
      inputPlaceholder: 'Kod gry',
    });
    if (gameCode) {
      navigate(`/game/${gameCode}`);
    }
  };

  return (
    <ButtonsWrapper>
      <Button onClick={handleCreateButtonClick} aria-label="create-game">
        Create a game
      </Button>
      <Button onClick={handleJoinButtonClick} aria-label="join-game">
        Join a game
      </Button>
    </ButtonsWrapper>
  );
};

export default Home;
