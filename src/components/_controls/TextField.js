import styled from "styled-components";

export const FieldContainer = styled.div`
  position: relative;
  max-width: 400px;
`;

export const TextInput = styled.input`
  font-family: "Lexend", sans-serif;
  color: #fffefa;
  background: 0;
  border: 0;
  outline: none;
  width: 100%;
  text-align: left;
  font-size: 1.5em;
  transition: padding 0.3s 0.2s ease;
  &:focus {
    padding-bottom: 5px;
  }
  &:focus + .line {
    &:after {
      transform: scaleX(1);
    }
  }
`;

export const Line = styled.div`
  width: 100%;
  height: 3px;
  position: absolute;
  bottom: -8px;
  background: #fffefa;
  &:after {
    content: " ";
    position: absolute;
    float: right;
    width: 100%;
    height: 3px;
    transform: scalex(0);
    transition: transform 0.3s ease;
    background: #1abc9c;
  }
`;

const TextField = (props) => (
  <FieldContainer>
    <TextInput {...props} role="TextInput" />
    <Line />
  </FieldContainer>
);

export default TextField;
