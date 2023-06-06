import { render } from "@testing-library/react";
import { LogoutButton } from "@/components/LogoutButton";
import { signOut } from "next-auth/react";

jest.mock("next-auth/react");

describe("LogoutButton", () => {
  it("renders the logout button", () => {
    const { getByText } = render(<LogoutButton />);

    const button = getByText("Sign Out");
    expect(button).toBeInTheDocument();
  });
  it("calls signOut when clicked", () => {
    const { getByText } = render(<LogoutButton />);

    const button = getByText("Sign Out");
    button.click();
    expect(signOut).toHaveBeenCalled();
  });
});
