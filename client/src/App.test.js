import { render, screen } from "./test-utils";
import App from "./App";

test("renders golist name", () => {
  render(<App />);
  const linkElement = screen.getByText(/GoList/i);
  expect(linkElement).toBeInTheDocument();
});
