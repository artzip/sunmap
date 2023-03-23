import styled from "styled-components";
import mapCssProp from "../_utils/mapCssProp";

const Box = styled.div`
  display: flex;
  ${mapCssProp("padding")}
  ${mapCssProp("margin")}
  ${mapCssProp("flex")}
  ${mapCssProp("flex-grow", "grow")}
  ${mapCssProp("flex-direction", "direction")}
  ${mapCssProp("justifyContent")}
  ${mapCssProp("alignItems")}
  ${mapCssProp("alignSelf")}
  ${mapCssProp("flexWrap", "wrap")}
`;

export default Box;
