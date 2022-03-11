import { useContext } from 'react';
import Logo from '../../assets/logo.svg';
import { GameContext } from '../../providers/GameProvider';
import {
  ScoreContainer,
  ScoreType,
  ScoresWrapper,
  Wrapper,
  Score,
} from './Header.styles';

const Header = () => {
  const { enemyScore, playerScore } = useContext(GameContext);

  return (
    <Wrapper>
      <img src={Logo} alt="logo" width={162} height={100} />
      <ScoresWrapper>
        <ScoreContainer>
          <ScoreType>Your Score</ScoreType>
          <Score>{playerScore}</Score>
        </ScoreContainer>
        <ScoreContainer>
          <ScoreType>Enemy Score</ScoreType>
          <Score>{enemyScore}</Score>
        </ScoreContainer>
      </ScoresWrapper>
    </Wrapper>
  );
};

export default Header;
