import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "@/components/SearchBar";

jest.useFakeTimers();

beforeEach(async () => {
  const mockSetSearch = jest.fn();
  render(<SearchBar setSearch={mockSetSearch} />);
});

describe("SearchBar", () => {
  it("renders a search bar with a search button", async () => {
    const searchBar = await screen.findByRole("search");
    const searchButton = await screen.findByRole("button");

    expect(searchBar).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it("types a name in the search bar", async () => {
    const searchBar = screen.getByPlaceholderText("Search Learner Name");
    userEvent.type(searchBar, "Lynde Ivoshin");

    jest.runAllTimers();

    await waitFor(
      () => {
        expect(searchBar).toHaveValue("Lynde Ivoshin");
      },
      { timeout: 10000 }
    );
  });
});
