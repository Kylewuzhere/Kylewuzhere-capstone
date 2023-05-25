import { render } from "@testing-library/react";
import Header from "../src/components/Header";

jest.mock("next-auth/next");

describe("Header", () => {
  it("renders the header", () => {
    const session = jest.fn();
    const { getByAltText } = render(<Header session={session} />);

    const image = getByAltText("Logo");
    expect(image.src).toContain("/images/logo-transparent.png");
  });
});
