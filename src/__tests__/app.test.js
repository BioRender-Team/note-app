import { render, screen } from "@testing-library/react";
import { App } from "../App";
import "@testing-library/jest-dom";

it("Component should render correctly", async () => {
  render(<App />);
  expect(screen.getByRole("heading")).toHaveTextContent("Notes");
});
