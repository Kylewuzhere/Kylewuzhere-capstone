import { render, screen } from "@testing-library/react";
import Footer from "../src/components/Footer";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

const setup = () => {
  render(<Footer />);
};

describe("Footer", () => {
  test("The footer renders", () => {
    // Mock the authentication state
    const mockSession = [false, false];
    const useSession = jest.fn().mockReturnValue(mockSession);

    setup();

    expect(
      screen.getByText(/©2023 by Developers Institute/i)
    ).toBeInTheDocument();
  });
});
