import { render } from "@testing-library/react";
import LoadingView from "@/components/LoadingView";

describe("LoadingView", () => {
  it("renders the loading view", () => {
    const { getByText } = render(<LoadingView />);

    const text = getByText("Loading...");
    expect(text).toBeInTheDocument();
  });
});
