import { render, screen } from "../../test-utils";
import UrlTextInput from "./UrlTextInput";


test("renders a input link", () => {
  render(<UrlTextInput n={0} url="hello" />);
  const inputElement = screen.getByLabelText(/URL #1/i);
  expect(inputElement).toBeInTheDocument();
});
