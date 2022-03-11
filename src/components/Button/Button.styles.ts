import styled from 'styled-components';

export const StyledButton = styled.button`
  background-color: #ffffff;
  border: none;
  border-radius: 15px;
  font-size: 1.7rem;
  margin: 20px;
  text-transform: uppercase;
  font-weight: 700;
  padding: 10px 25px;
  min-width: 350px;
  height: 75px;
  cursor: pointer;
  color: #3b4363;
  text-align: center;
  transition: 0.3s;
  &:hover {
    color: #fff;
    background-color: #3b4363;
  }
`;
