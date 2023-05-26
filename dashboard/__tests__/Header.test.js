import { render } from "@testing-library/react";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";

jest.mock("next-auth/react");

describe("Header", () => {
  it("renders the header", () => {
    useSession.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });
    const { getByAltText } = render(<Header />);

    const image = getByAltText("Logo");
    expect(image.src).toContain("/images/logo-transparent.png");
  });
  it("renders the header without logout button", () => {
    useSession.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });
    const { queryByText } = render(<Header />);

    const button = queryByText("Sign Out");
    expect(button).not.toBeInTheDocument();
  });
  it("renders the header with logout button", () => {
    useSession.mockReturnValueOnce({
      data: {
        user: {
          name: "Test User",
          email: "tzirw@example.com",
          image: "https://example.com/image.png",
        },
      },
      status: "authenticated",
    });
    const { getByText } = render(<Header />);

    const button = getByText("Sign Out");
    expect(button).toBeInTheDocument();
  });
});
