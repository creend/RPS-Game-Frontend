import styled, { css, keyframes } from 'styled-components';

export const Wrapper = styled.section`
  width: 95%;
  max-width: 800px;
  margin: 50px auto;
  display: flex;
  justify-content: center;
`;

export const PickerInfo = styled.h2`
  color: #fff;
  text-transform: uppercase;
  font-size: 1.05rem;
  letter-spacing: 2px;
  margin: 14.4px 0 30px;
`;

export const ResultWrapper = styled.article`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const ResultInfo = styled.h1`
  margin: 0 30px;
  font-size: 3rem;
  color: #fff;
  font-weight: 700;
`;

export const ChoiceWrapper = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

interface ButtonProps {
  againRequest: boolean;
}

const changeBackground = keyframes`
  from{
    background-color: #fff;
    color:#3b4363;
  }to{
    background-color:#3b4363;
    color:#fff;
  }
`;

export const PlayAgainButton = styled.button<ButtonProps>`
  font-size: 0.75rem;
  color: #3b4363;
  border: none;
  padding: 10px 40px;
  text-align: center;
  font-family: 'Barlow Semi Condensed', sans-serif;
  text-transform: uppercase;
  transition: 0.3s color;
  &:hover {
    color: hsl(349, 71%, 52%);
  }
  font-weight: 600;
  border-radius: 3px;
  margin: 20px 0;
  cursor: pointer;
  background-color: #fff;
  animation: ${({ againRequest }) =>
    againRequest
      ? css`
          ${changeBackground}
          1s infinite alternate
        `
      : ''};
`;
