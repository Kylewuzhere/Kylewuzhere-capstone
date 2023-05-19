import { render } from "@testing-library/react";
import Header from "../src/components/Header";

describe("Header", () => {
  it("renders the header", () => {
    const { getByAltText } = render(<Header />);

    const image = getByAltText("Logo");
    expect(image.src).toContain("/images/logo-transparent.png");
  });
});
