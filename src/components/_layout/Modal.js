import styled from "styled-components";
import { useSpring } from "@react-spring/core";
import { animated } from "@react-spring/web";

const StyledModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: start;
  width: 100%;
  height: 100%;
`;

const StyledModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

const ModalBackground = (props) => {
  const styleProps = useSpring({
    background: props.showModal ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0)",
    display: props.showModal ? "block" : "none",
  });
  const AnimatedModalBackground = animated(StyledModalBackground);
  return <AnimatedModalBackground style={styleProps} {...props} />;
};

const StyledModalWindow = styled.div`
  posiiton: relative;
  flex-grow: 0;
  min-height: 70px;
  max-width: 400px;
  padding: 40px;
  border-radius: 15px;
  background: #222529;
`;

const ModalWindow = (props) => {
  const styleProps = useSpring({
    y: props.showModal ? 200 : 0,
    padding: props.showModal ? "40px" : "15px",
  });
  const AnimatedModalWindow = animated(StyledModalWindow);
  return <AnimatedModalWindow style={styleProps} {...props} />;
};

const Modal = (props) => (
  <StyledModalContainer>
    <ModalBackground
      showModal={props.showModal}
      role="ModalBackground"
      onClick={props.handleBackgroundClick}
    />
    <ModalWindow role="ModalWindow" {...props} />
  </StyledModalContainer>
);

export default Modal;
