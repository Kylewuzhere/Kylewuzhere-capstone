import { render } from "@testing-library/react";
import { LoginButton } from "@/components/LoginButton";
import { signIn } from "next-auth/react";

jest.mock("next-auth/react");

describe("LoginButton", () => {
  it("renders the login button", () => {
    const { getByText } = render(<LoginButton />);

    const button = getByText("Sign in");
    expect(button).toBeInTheDocument();
  });
  it("calls signIn when clicked", () => {
    const { getByText } = render(<LoginButton />);

    const button = getByText("Sign in");
    button.click();
    expect(signIn).toHaveBeenCalled();
  });
});
