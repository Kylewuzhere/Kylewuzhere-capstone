import renderer from "react-test-renderer";
import Home from "../src/app/page.js";

describe("Home", () => {
  it("renders Home correctly", async () => {
    const tree = renderer.create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
