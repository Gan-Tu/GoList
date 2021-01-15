import { render, screen } from "@testing-library/react";
import UrlTextInput from "./UrlTextInput";

test("renders a input link", () => {
  render(<UrlTextInput n={1} url="hello" />);
  const inputElement = screen.getByLabelText(/URL #1/i);
  expect(inputElement).toBeInTheDocument();
});
