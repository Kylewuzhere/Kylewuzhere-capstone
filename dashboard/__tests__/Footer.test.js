import { render, screen } from "@testing-library/react";
import Footer from "../src/components/Footer";


const setup = () => {
  render(<Footer />);
};

describe("Footer", () => {
  test("The footer renders", () => {

    setup();

    expect(
      screen.getByText(/©2023 by Developers Institute/i)
    ).toBeInTheDocument();
  });
});
