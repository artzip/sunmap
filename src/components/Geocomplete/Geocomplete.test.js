import { render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Geocomplete from "./Geocomplete";

test("Geocomplete loads and shows text input", async () => {
  render(<Geocomplete onLocationChanged={() => {}} />);
  await waitFor(() =>
    expect(screen.getByRole("TextInput")).toBeInTheDocument()
  );
});
