import { render, screen } from "@testing-library/react";
import PaginationControls from "../src/components/PaginationControls";

describe("PaginationControls", () => {
  it("clicks the disabled Prev button on page 1 and does not call onPrev", () => {
    const onPrev = jest.fn();
    render(
      <PaginationControls
        onNext={() => {}}
        onPrev={onPrev}
        currentPage={1}
        nextDisabled={null}
      />
    );

    const previousButton = screen.getByRole("button", {
      name: "Prev",
    });
    expect(previousButton).toBeDisabled();
    previousButton.click(previousButton);
    expect(onPrev).not.toHaveBeenCalled();
  });
  it("clicks the enabled Prev button on page 3 and calls onPrev.", () => {
    const onPrev = jest.fn();
    render(
      <PaginationControls
        onNext={() => {}}
        onPrev={onPrev}
        currentPage={3}
        nextDisabled={null}
      />
    );

    const previousButton = screen.getByRole("button", {
      name: "Prev",
    });
    expect(previousButton).toBeEnabled();
    previousButton.click(previousButton);
    expect(onPrev).toHaveBeenCalled();
  });
  it("clicks the disabled Next button and does not call onNext.", () => {
    const onNext = jest.fn();
    render(
      <PaginationControls
        onNext={onNext}
        onPrev={() => {}}
        currentPage={10}
        nextDisabled={true}
      />
    );
    const nextButton = screen.getByRole("button", {
      name: "Next",
    });
    expect(nextButton).toBeDisabled();
    nextButton.click(nextButton);
    expect(onNext).not.toHaveBeenCalled();
  });
});
