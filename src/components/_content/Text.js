import styled from "styled-components";
import mapCssProp from "../_utils/mapCssProp";

function fontSize({ size }) {
  switch (size) {
    case "xlarge":
      return "font-size: 3.6em;";
    case "large":
      return "font-size: 3em;";
    case "medium":
      return "font-size: 2em;";
    case "small":
      return "font-size: 1.4em;";
    case "xsmall":
      return "font-size: 1em;";
    default:
      return "font-size: 2em;";
  }
}

const Text = styled.span`
  ${fontSize}
  ${mapCssProp("margin")}
`;

export default Text;
