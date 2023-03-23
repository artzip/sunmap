import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

test("loads and displays Dashboard", async () => {
  render(<App />);

  await waitFor(() => screen.getByRole("Dashboard"));

  expect(screen.getByRole("Dashboard")).toBeVisible();
});
