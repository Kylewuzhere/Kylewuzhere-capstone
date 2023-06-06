import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import Cohorts from "../src/app/dashboard/cohorts/page.js";

beforeEach(async () => {
  render(<Cohorts />);
});

describe("Cohorts", () => {
  it("renders Cohorts correctly", async () => {
    const tree = renderer.create(<Cohorts />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("renders a list of cohorts", async () => {
    const cohorts = await screen.findAllByRole("link");
    expect(cohorts).toHaveLength(9);
  });
});
