import { render, screen } from "../../test-utils";
import UrlTextInput from "./UrlTextInput";


test("renders a input link", () => {
  render(<UrlTextInput n={0} url="hello" />);
  const inputElement = screen.getByLabelText(/Long URL/i);
  expect(inputElement).toBeInTheDocument();
});
