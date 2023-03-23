import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { QueryClient, QueryClientProvider } from "react-query";
import { rest } from "msw";
import { setupServer } from "msw/node";
import WeatherChart from "./WeatherChart";
import { mockApiData } from "./test-data";

const server = setupServer(
  rest.get(
    "https://api.openweathermap.org/data/2.5/onecall",
    (req, res, ctx) => {
      return res(ctx.json(mockApiData));
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const queryClient = new QueryClient();

const DashboardTestWrapper = (props) => (
  <QueryClientProvider {...props} client={queryClient} />
);

test("WeatherChart requests and presents data after location is set", async () => {
  render(
    <DashboardTestWrapper>
      <WeatherChart location={{ lat: 40, lng: 40 }} />
    </DashboardTestWrapper>
  );

  await waitFor(() => screen.getByRole("WeatherChart"));
  await waitFor(() => screen.getByRole("CurrentTemp"));
  await waitFor(() =>
    expect(
      screen.getByText(Math.floor(mockApiData.hourly[4].temp))
    ).toBeInTheDocument()
  );
  await waitFor(() =>
    expect(
      screen.getByText(Math.floor(mockApiData.current.temp))
    ).toBeInTheDocument()
  );
});
