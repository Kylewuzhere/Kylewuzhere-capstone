import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import Page from "../src/app/dashboard/cohorts/page";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

const setup = () => {
  render(<Page />);
};

jest.useFakeTimers();

describe("Cohorts Page", () => {
  test("The title renders when user is logged in", () => {
    // Mock the authentication state
    const mockSession = [true, false]; // User is logged in
    useSession.mockReturnValue(mockSession);

    setup();

    expect(screen.getByText(/COHORTS/i)).toBeInTheDocument();
  });

  test("The title does not render when user is not logged in", () => {
    // Mock the authentication state
    const mockSession = [false, false]; // User is not logged in
    useSession.mockReturnValue(mockSession);

    setup();

    expect(screen.getByText(/COHORTS/i)).toBeNull();
  });
});
