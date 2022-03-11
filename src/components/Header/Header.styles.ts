import styled from 'styled-components';

export const Wrapper = styled.header`
  width: 95vw;
  max-width: 800px;
  height: 175px;
  margin: 50px auto;
  padding: 20px;
  border: 3px solid #808080;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ScoresWrapper = styled.section`
  display: flex;
  height: 90%;
  justify-content: space-around;
  align-items: center;
`;

export const ScoreContainer = styled.article`
  background-color: #fff;
  min-width: 200px;
  margin: 15px;
  height: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ScoreType = styled.h4`
  font-size: 1.2rem;
  color: #2a46c0;
  text-transform: uppercase;
  text-align: center;
`;

export const Score = styled.p`
  font-size: 3rem;
  color: #3b4363;
  font-weight: 700;
  text-align: center;
`;
