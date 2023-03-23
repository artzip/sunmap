import Box from "../_layout/Box";
import { DateTime } from "luxon";
import styled from "styled-components";
import {
  mountainGrey,
  coronaWhite,
  nightBlue,
  cloudBlue,
  clearYellow,
  sunsetAmber,
} from "../../theme";

function sunStyles({ dateTime, weather, sunrise, sunset }) {
  if (!!sunrise && !!sunset) {
    if (
      dateTime <= DateTime.fromSeconds(sunrise).minus({ hours: 1 }) ||
      dateTime >= DateTime.fromSeconds(sunset).plus({ hours: 1 })
    ) {
      return `
        background: ${nightBlue};
        color: ${coronaWhite};
      `;
    }
  }

  if (weather.clouds > 75) {
    return `
      background: ${cloudBlue};
      color: ${coronaWhite};
    `;
  }

  if (!!sunrise && !!sunset) {
    if (
      dateTime <= DateTime.fromSeconds(sunrise).plus({ hours: 1 }) ||
      dateTime >= DateTime.fromSeconds(sunset).minus({ hours: 1 })
    ) {
      return `
      background: ${sunsetAmber};
      color: ${mountainGrey};
    `;
    }
  }

  return `
      background: ${clearYellow};
      color: ${mountainGrey};
    `;
}

function size(props) {
  switch (props.size) {
    case "medium":
      return "min-width: 110px;";
    case "large":
      return "min-width: 150px;";
    default:
      return `
        max-width: 90px;
        min-width: 70px;
      `;
  }
}

const StyledSunTile = styled(Box)`
  ${sunStyles}
  ${size}
  align-items: flex-start;
  padding: 15px;
  flex-direction: column;
  border-radius: 10px;
`;

export default StyledSunTile;
