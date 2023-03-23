import React from "react";
import { DateTime } from "luxon";
import { render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SunTile from "./SunTile";
import { nightBlue, cloudBlue, clearYellow, sunsetAmber } from "../../theme";

const defaultTestCase = {
  sunrise: DateTime.now().minus({ hours: 1 }).toSeconds(),
  sunset: DateTime.now().plus({ hours: 1 }).toSeconds(),
  weather: {
    clouds: 78,
  },
  dateTime: DateTime.now(),
};

function testBackgroundColor(cases, expectedColor) {
  test.each(cases)(
    `SunTile has bg color (${expectedColor}) for values (%o)`,
    (props) => {
      const { container } = render(<SunTile {...props} />);

      expect(container.firstChild).toHaveStyle(`background: ${expectedColor}`);
    }
  );
}

describe("SunTile approximates sunlight onto background color consistently", () => {
  describe("displays nightBlue for times < 1 hour before sunrise and > 1 hour after sunset", () => {
    const testCases = [
      [
        {
          ...defaultTestCase,
          sunrise: DateTime.now().plus({ hours: 1 }).toSeconds(),
          sunset: DateTime.now().minus({ hours: 8 }).toSeconds(),
        },
      ],
      [
        {
          ...defaultTestCase,
          sunrise: DateTime.now().plus({ hours: 8 }).toSeconds(),
          sunset: DateTime.now().minus({ hours: 1 }).toSeconds(),
        },
      ],
      [
        {
          ...defaultTestCase,
          sunrise: DateTime.now().plus({ hours: 2 }).toSeconds(),
          sunset: DateTime.now().minus({ hours: 2 }).toSeconds(),
        },
      ],
      [
        {
          ...defaultTestCase,
          sunrise: DateTime.now().plus({ hours: 3 }).toSeconds(),
          sunset: DateTime.now().minus({ hours: 4 }).toSeconds(),
        },
      ],
      [
        {
          ...defaultTestCase,
          sunrise: DateTime.now().plus({ hours: 11 }).toSeconds(),
          sunset: DateTime.now().minus({ hours: 18 }).toSeconds(),
        },
      ],
    ];

    testBackgroundColor(testCases, nightBlue);
  });

  describe("displays cloudBlue for times > 1 hour after sunrise and < 1 hour before sunset with > 75% cloud cover", () => {
    const testCases = [
      [defaultTestCase],
      [
        {
          ...defaultTestCase,
          sunrise: DateTime.now().minus({ hours: 2 }).toSeconds(),
          sunset: DateTime.now().plus({ hours: 8 }).toSeconds(),
          weather: {
            clouds: 76,
          },
        },
      ],
      [
        {
          ...defaultTestCase,
          sunrise: DateTime.now().minus({ hours: 4 }).toSeconds(),
          sunset: DateTime.now().plus({ hours: 5 }).toSeconds(),
          weather: {
            clouds: 100,
          },
        },
      ],
    ];

    testBackgroundColor(testCases, cloudBlue);
  });

  describe("displays sunsetAmber for times within an hour (before or after) sunrise or sunset with < 75% cloud cover", () => {
    const testCases = [
      [
        {
          ...defaultTestCase,
          sunrise: DateTime.now().minus({ hours: 1 }).toSeconds(),
          sunset: DateTime.now().plus({ hours: 8 }).toSeconds(),
          weather: {
            clouds: 74,
          },
        },
      ],
      [
        {
          ...defaultTestCase,
          sunrise: DateTime.now().minus({ hours: 8 }).toSeconds(),
          sunset: DateTime.now().plus({ minutes: 30 }).toSeconds(),
          weather: {
            clouds: 2,
          },
        },
      ],
      [
        {
          ...defaultTestCase,
          sunrise: DateTime.now().minus({ minutes: 10 }).toSeconds(),
          sunset: DateTime.now().plus({ hours: 8 }).toSeconds(),
          weather: {
            clouds: 1,
          },
        },
      ],
    ];

    testBackgroundColor(testCases, sunsetAmber);
  });

  describe("displays clearYellow for times > 1 after sunrise and < 1 hour before sunset with < 75% cloud cover", () => {
    const testCases = [
      [
        {
          ...defaultTestCase,
          sunrise: DateTime.now().minus({ hours: 2 }).toSeconds(),
          sunset: DateTime.now().plus({ hours: 2 }).toSeconds(),
          weather: {
            clouds: 74,
          },
        },
      ],
      [
        {
          ...defaultTestCase,
          sunrise: DateTime.now().minus({ hours: 4 }).toSeconds(),
          sunset: DateTime.now().plus({ hours: 5 }).toSeconds(),
          weather: {
            clouds: 1,
          },
        },
      ],
      [
        {
          ...defaultTestCase,
          sunrise: DateTime.now().minus({ hours: 4 }).toSeconds(),
          sunset: DateTime.now().plus({ hours: 5 }).toSeconds(),
          weather: {
            clouds: 0,
          },
        },
      ],
    ];

    testBackgroundColor(testCases, clearYellow);
  });
});
