import { render, screen } from "@testing-library/react";
import LearnerDetails from "@/components/LearnerDetails";

describe("LearnerDetails", () => {
  it("renders LearnerDetails with data of id = 3", async () => {
    render(<LearnerDetails learnerId={0} />);
    const learnerName = await screen.findByText("Amii Juan");
    const cohortName = await screen.findByText("consequat");

    expect(learnerName).toBeInTheDocument();
    expect(cohortName).toBeInTheDocument();
  });
  // TODO: test onclick modal pop up
});
