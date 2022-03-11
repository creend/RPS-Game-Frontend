import styled from 'styled-components';
import { Pick } from '../../types/pick';

const GRADIENTS = {
  rock: 'to bottom, hsl(349, 71%, 52%), hsl(349, 70%, 56%)',
  paper: ' to bottom, hsl(230, 89%, 62%), hsl(230, 89%, 65%)',
  scissors: 'to bottom, hsl(39, 89%, 49%), hsl(40, 84%, 53%)',
};

interface Props {
  pickType: Pick;
}

export const StyledButton = styled.button<Props>`
  border: none;
  border-radius: 50%;
  box-shadow: inset 0 -5px rgb(0 0 0 / 15%);
  cursor: pointer;
  margin: 0 25px;
  height: 150px;
  width: 150px;
  background: linear-gradient(${({ pickType }) => GRADIENTS[pickType]});
`;

export const IconWrapper = styled.div`
  background-color: #fff;
  border-radius: 50%;
  box-shadow: inset 0 5px rgb(0 0 0 / 15%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  width: 120px;
`;
